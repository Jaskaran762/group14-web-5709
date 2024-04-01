const express = require('express');
const router = express.Router();

let {
    createSubscription, 
    handlePaymentSuccess, 
 } = require('./../controllers/subscriptionController');
const userAuth = require('../middleware/auth');

router.post('/create-subscription-checkout-session', userAuth, createSubscription);
router.post('/payment-success', userAuth, handlePaymentSuccess);

module.exports = router;
