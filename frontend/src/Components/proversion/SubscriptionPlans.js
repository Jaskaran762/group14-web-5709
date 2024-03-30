import React, {useEffect, useState} from 'react';
import './SubscriptionPlans.css';
// import firebase from "../../firebase/firebaseConfig";

const data = [
  {
    id: 1,
    title: "Monthly",
    price: "9.99",
  },
  {
    id: 2,
    title: "Yearly",
    price: "99.99",
  },
];

const SubscriptionPlans = () => {
  // const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserId(user.uid);
  //       const userRef = firebase.database().ref("users/" + user.uid);
  //       userRef.on("value", (snapshot) => {
  //         const userVal = snapshot.val();
  //       });
  //     } else {
  //       setUserId("");
  //     }
  //   });
  // }, [userId]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log("StoredToken --------> ", storedToken)
  }, []);

  // const checkout = (plan) => {
  //   fetch("http://localhost:5000/api/v1/create-subscription-checkout-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     mode: "cors",
  //     body: JSON.stringify({ plan: plan, customerId: userId }),
  //   })
  //     .then((res) => {
  //       if (res.ok) return res.json();
  //       console.log("response is: ", res);
  //       return res.json().then((json) => Promise.reject(json));
  //     })
  //     .then(({ session }) => {
  //       window.location = session.url;
  //     })
  //     .catch((e) => {
  //       console.log("error is:", e);
  //     });
  // };

  const checkout = (plan) => {
    fetch("http://localhost:5000/api/v1/create-subscription-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ plan: plan }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.error("Error creating checkout session:", res.statusText);
      })
      .then(({ session }) => {
        console.log("Session --------------> ",session)
        localStorage.setItem("sessionId",session.id)
        window.location = session.url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="subscription-plans">
      <h1>Choose a Collaborative Plan</h1>
      {data.map((item, idx) => (
        <div className="plans-container">
        <div key={idx} className="plan-card">
          <h2>{item.title}</h2>
          <p>${item.price}</p>
          <button 
          onClick={() => checkout(Number(item.price))}
          className="pay-now-button">
            Pay Now
          </button>
        </div>
      </div>

      ))}
      
    </div>
  );
};

export default SubscriptionPlans;
