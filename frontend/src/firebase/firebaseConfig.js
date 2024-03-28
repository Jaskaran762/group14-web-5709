import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"


const firebaseConfig = {
  apiKey: "AIzaSyCHSa97b8Pae7Xix-1JR-7UO9H6X6fm6a0",
  authDomain: "stripe-subscription-3f77e.firebaseapp.com",
  projectId: "stripe-subscription-3f77e",
  storageBucket: "stripe-subscription-3f77e.appspot.com",
  messagingSenderId: "82291820734",
  appId: "1:82291820734:web:ce98d121b9e40788f0b6ef"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase