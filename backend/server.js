const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const learningRoutes = require("./routes/learningRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api", learningRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});