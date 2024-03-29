let mongoose = require("mongoose");
let Schema =mongoose.Schema;
const { ObjectId} = require("bson");
let subscriptionSchema =new Schema({
    planId: {

    },
    planType: {

    },
    planStartDate: {

    },
    planEndDate: {

    },
    planDuration: {

    },
    
    userId:{
        type:ObjectId,
        required:true
    }
})
let expenseModel = mongoose.model("subscription",subscriptionSchema);
module.exports=expenseModel;