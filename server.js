// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tracegreen_auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log("👉 Received signup:", req.body);
    const { name, email, phone, password } = req.body;
    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    console.log("✅ User saved:", newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
