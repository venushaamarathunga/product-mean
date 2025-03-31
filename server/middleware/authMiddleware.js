import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY || "Authorization";
    let jwtSecretKey = process.env.PRIVATEKEY_ACCESSTOKEN;
    const token = req.header(tokenHeaderKey);

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(tokenValue, jwtSecretKey);

    if (!decoded || !decoded.user?.id) {
      return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }

    const user = await User.findById(decoded.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};

// Role-Based Access Control (RBAC)
export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
    }
    next();
  };
};
