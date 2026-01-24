const jwt = require("jsonwebtoken")
const authenticat = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const secret_key = "mynameisdivesh";
        const decoded = jwt.verify(token, secret_key);
        
        // Set the user email in the request
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticat;