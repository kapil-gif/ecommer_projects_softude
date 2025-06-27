import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader in backend: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
        alert("Access denied. No token provided");
    }
    const token = authHeader.split(" ")[1];


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("decoded in token ", decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Verify Error:", err.message);
        return res.status(403).json({ message: "Invalid or expired token" });
        alert("Invalid or expired token")
    }
};
