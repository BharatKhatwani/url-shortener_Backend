const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("Authorization Header:", authHeader);
    // console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    //  console.log( "ENV FILE " , process.env.ACCESS_TOKEN_SECRET)
    // console.log("Access Token:", token);

    try {
        // ✅ Use ACCESS_TOKEN_SECRET instead of SECRET_KEY
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       
        // console.log("Decoded JWT:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
