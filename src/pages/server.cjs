const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_super_secret_key"; // move to .env in real app

app.post('/api/auth/signup', async (req, res) => {
  const { companyName, phone, website, email, password } = req.body;

  // Assume OTP is already verified at this point

  const user = new User({ companyName, phone, website, email, password });
  await user.save();

  // Generate JWT Token
  const token = jwt.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '2h' });

  res.json({ message: "Signup successful", token });
});
