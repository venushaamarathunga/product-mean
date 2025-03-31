import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "customer"], default: "customer" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
