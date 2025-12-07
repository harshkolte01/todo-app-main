const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.toLowerCase().startsWith("bearer")) {
            return res.status(401).json({ message: "Unauthorized. Not A Valid Token" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access demoed. Invalid Token format. " })
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token" })
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Expire Token" })
        }
        return res.status(401).json({
            message: "Auth Failed",
            error: error.message
        })
    }
}

// exports.validateAuthData = async (req, res, next) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username) {
//             return res.status(400).json({ message: "username is missing" });
//         }
//         if (!email) {
//             return res.status(400).json({ message: "email is missing" });
//         }
//         if (!password) {
//             return res.status(400).json({ message: "password is missing" });
//         }
//     } catch (error) {
//         next(error);
//     }
// }