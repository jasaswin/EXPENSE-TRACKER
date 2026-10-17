import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });


const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// POST /api/auth/signup
export const registerUser = async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ token: createToken(user), user: publicUser(user) });
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  const passwordMatches = user && (await bcrypt.compare(password, user.password));


  if (!passwordMatches) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  res.json({ token: createToken(user), user: publicUser(user) });
};
