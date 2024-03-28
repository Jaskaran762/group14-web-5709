require("dotenv").config()
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json")
const express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const connectDB = require('./utils/dbConnection');
connectDB();

app.use(express.json())
const expenseRoutes=require('./routes/expenseRoutes');
const userRoutes=require('./routes/userRoutes');
app.use(express.urlencoded({ extended: true }));
app.use('/expense',expenseRoutes);
app.use('/user',userRoutes);


const port = 5000




app.use(bodyParser.json())

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stripe-subscription-3f77e-default-rtdb.firebaseio.com"
  });

const [monthly, yearly] = ['price_1Oz5kc01hABKBF0gHa1cK5Es', 'price_1Oz5ot01hABKBF0gnY7Qd0pX'];

app.use(
    cors({
        origin:"http://localhost:3000"
    })
)

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

/***************create subscription ****************/
const stripeSession = async(plan) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });
        return session;
    }catch (e){
        return e;
    }
};


app.post("/api/v1/create-subscription-checkout-session", async(req, res) => {
    const {plan, customerId} = req.body;
    let planId = null;
    if(plan == 9.99) planId = monthly;
    else if(plan == 99.99) planId = yearly;

    try{

        const session = await stripeSession(planId);
        const user = await admin.auth().getUser(customerId);

        await admin.database().ref("users").child(user.uid).update({
            subscription: {
                sessionId: session.id
            }
        });
        return res.json({session})

    }catch(error){
        res.send(error)
    }
})

/*************** payment success ****************/
app.post("/api/v1/payment-success", async (req, res) => {
    const { sessionId, firebaseId } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === 'paid') {
          const subscriptionId = session.subscription;
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const user = await admin.auth().getUser(firebaseId);
            const planId = subscription.plan.id;
            const planType = subscription.plan.amount === 9.99 ? "monthly" : "yearly";
            const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
            const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
            const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
            await admin.database().ref("users").child(user.uid).update({ 
                subscription: {
                  sessionId: null,
                  planId:planId,
                  planType: planType,
                  planStartDate: startDate,
                  planEndDate: endDate,
                  planDuration: durationInDays
                }});
  
              
            } catch (error) {
              console.error('Error retrieving subscription:', error);
            }
          return res.json({ message: "Payment successful" });
        } else {
          return res.json({ message: "Payment failed" });
        }
      } catch (error) {
        res.send(error);
      }
    });
  
         
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})
