 import Stripe from "stripe";
 import UserModel from "../models/user.model.js" 
 import dotenv from "dotenv";  

 dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
    100: 50,
    200: 120,
    500: 300,
}

export const createCreditsOrder = async (req, res) => {
    try {
        const userId = req.userId;   // we put isAuth middleware before this controller, so we can access userId from req object
        const { amount } = req.body;

        if(!CREDIT_MAP[amount]) {  // we check if the amount is valid and exists in our CREDIT_MAP, if not we return an error response with status code 400 (Bad Request) and a message indicating that the amount is invalid.
            return res.status(400).json({ error: "Invalid amount" });
        }

        // Create a new order with Stripe
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
            line_items: [
                {
                    price_data: {
                        currency: "inr", // We set the currency to INR since we're dealing with Indian Rupees
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits`, // We use the CREDIT_MAP to get the number of credits corresponding to the amount and set it as the product name in Razorpay order. For example, if the amount is 100, the product name will be "50 Credits". This helps us identify which package of credits the user is purchasing when we receive the payment confirmation from Razorpay.
                        },
                        unit_amount: amount * 100, // Razorpay expects the amount in paise, so we multiply by 100 beacause 1 INR = 100 paise
                    },
                    quantity: 1, // We set the quantity to 1 since we're selling a single package of credits
                },
            ],
            metadata: {  // through metadata we can update the user's credits after successful payment. We store the userId and the number of credits corresponding to the amount in metadata. For example, if the user is purchasing the 200 INR package, we will store 120 credits in metadata. This way, when we receive the payment confirmation from Razorpay, we can easily determine how many credits to add to the user's account based on the amount they paid.
                userId,
                credits: CREDIT_MAP[amount], // according to the amount, we get the corresponding credits from CREDIT_MAP and store it in metadata. For example, if the amount is 200, we will store 120 credits in metadata. This way, when we receive the payment confirmation from Razorpay, we can easily determine how many credits to add to the user's account based on the amount they paid.
            },
        })

        res.status(200).json({ url: session.url }); // After cresting session we got session url => this url we send on frontend, and when user click on that url they will redirect to Razorpay payment page to complete the payment.
        
    } catch (error) {
        console.error("Error creating credits order:", error);
        res.status(500).json({ error: "Failed to create credits order" });
    }
}



// we do setup for Weebhook :-
export const stripWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"]  // inside headers we get strip signature after the completion of payment
    // in headers we get "Raw Data" so that we create it's route in "server.js" file above "express.json - because it converts raw data into json data" that's why.

    // through those strip signature we find event
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_SECRET_KEY
        )
    } catch (error) {
        console.log("❌ Webhook signature error:", error.message);
        return res.status(400).send("Webhook Error");
    }

    // we check if our session is completed, after that we find userId and credits from that event or metadata and then we update our credits and user inside our user model
    if(event.type === "checkout.session.completed") {
        const session = event.data.object;

        const userId = session.metadata.userId;
        const creditsToAdd = Number(session.metadata.credits);

        if(!userId || !creditsToAdd) {
            return res.status(400).json({ message: "Invalid metadata" });
        }

        const user = await UserModel.findByIdAndUpdate(userId, {
            $inc: { credits: creditsToAdd },
            $set: { isCreditAvailable: true },  
        }, {new:true})
    }

    res.json({ received: true });
}