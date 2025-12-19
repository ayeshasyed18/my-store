const cors = require('cors');
const dotenv = require('dotenv');
const Stripe = require('stripe');
const express = require('express');

// dotenv midleware
dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// allow frontend origin

app.use(cors({origin:process.env.CLIENT_URL,}))
app.use(express.json());

// checkout api
app.post('/create-checkout-session', async(req,res)=>{ 
    try{ const { product } = req.body; 
    const session =  await stripe.checkout.sessions.create({  
         payment_method_types : ['card'],  
          line_items: [ { 
            price_data:{    currency: 'usd',  
                  product_data :{       
                     name : product.name,       
                      images: [product.img],    
                    }, 
                         unit_amount :  product.price * 100, },
                         quantity: 1,   } ], 
                           mode : 'payment',  
                            success_url:`${process.env.CLIENT_URL}/success`,
                               cancel_url:`${process.env.CLIENT_URL}/cancel` })
                               res.json({ url: session.url});
                             }catch(error){   
                                 res.status(500).json({ error: error.message})
                                 }
                                })
                                const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {    
    console.log(`Backend is running on port ${PORT}`);
});

module.exports = app;

