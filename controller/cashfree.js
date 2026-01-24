const { verifyPayment } = require('../services/cashfree');

 async function payment (req, res)  {
    try {
        const { orderId } = req.params;
        
        // Ask Cashfree for order status
        const status = await verifyPayment(orderId);
        
        res.json({ 
            orderStatus: status  // "PAID", "ACTIVE", "EXPIRED"
        });
        
    } catch (error) {
        console.error("Error checking payment status:", error);
        res.status(500).json({ error: "Failed to check status" });
    }
};
module.exports = payment