import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
  const user = req.body;

  if (!user.username || !user.email || !user.password || !user.gender || !user.address || !user.role) {
    return res.status(400).json({ success: false, message: "Please add all fields." });
  }
  // Ensure role is valid
  const validRoles = ["admin", "user", "customer"];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const userAvailable = await User.findOne({ email });
  if (!userAvailable) {
    res.status(400).json({ success: false, message: "User already registerd. " });
  }

  // hash password
  const hashPassword = await bcrypt.hash(user.password, 15);

  const newUser = new User({ username, email, password: hashPassword, gender, address, role: role || "customer" });

  try {
    const registerdUser = await newUser.save();

    if (!registerdUser) {
      res.status(400).json({ success: false, message: "User not registerd." });
    }
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, message: "All fields are mandatory." });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ user: { username: user.username, email: user.email, id: user.id } }, process.env.PRIVATEKEY_ACCESSTOKEN, { algorithm: "RS256" }, { expiresIn: 60 * 60 });
      res.status(200).json({ success: true, accessToken });
    } else {
      res.status(400).json({ success: false, message: "Email or password is not valid." });
    }
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const currentUser = async (req, res) => {
  res.json(req.user);
};

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    res.status(200).json({
      success: true,
      data: products,
    });

    const users = await User.find({}).select("-password").skip(skip).limit(parseInt(limit));

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === "") {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format." });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id." });
  }

  if (!user || Object.keys(user).length === 0) {
    return res.status(400).json({ success: false, message: "User data is required." });
  }

  try {
    if (user.email) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ success: false, message: "Email is already in use." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id." });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Delete the user." });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error." });
  }
};
