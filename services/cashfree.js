const axios = require('axios');

async function createOrder() {
    try {
        const orderId = "order_" + Date.now();
        
        const orderData = {
            order_amount: 1.00,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: "user_123",
                customer_phone: "9876543210"
            }
        };

        console.log("📦 Creating Cashfree order:", orderId);
        
        // Direct API call to Cashfree
        const response = await axios.post(
            'https://sandbox.cashfree.com/pg/orders',
            orderData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-version': '2023-08-01',
                    'x-client-id': process.env.CASHFREE_CLIENT_ID ,
                    'x-client-secret': process.env.CLIENT_SECRET
                }
            }
        );
        
        console.log("✅ Order created! Session ID:", response.data.payment_session_id);
        
        return {
        sessionId: response.data.payment_session_id,
        orderId: response.data.order_id}
     

        
    } catch (error) {
        console.error("❌ Cashfree Error:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("Message:", error.message);
        }
      
    }
}
async function verifyPayment(orderId) {
    const response = await axios.get(
        `https://sandbox.cashfree.com/pg/orders/${orderId}`,
        {
            headers: {
                'x-api-version': '2023-08-01',
                'x-client-id':  process.env.CASHFREE_CLIENT_ID ,
                'x-client-secret': process.env.CLIENT_SECRET
            }
        }
    );
    
    return response.data.order_status;
}
module.exports = {createOrder,verifyPayment};