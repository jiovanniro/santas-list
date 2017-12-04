import * as Stripe from 'stripe';
const stripe = new Stripe("PUT IN THE REAL sk_test_KEY" || '');

export function charge(token: string, amt: number) {
    
    console.log("inside stripe srvc");

    return stripe.charges.create({
        amount: amt * 100, 
        currency: 'usd', 
        source: token, 
        description: 'Donation'
    });
    // returning a promise, so when we call .charge, we can use .then(...)
}