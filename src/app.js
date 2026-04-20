const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stations", require("./routes/stationRoutes"));
app.use("/api/route", require("./routes/routeRoutes"));

// Health check (IMPORTANT for Monitoring stage)
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "EVAT DevOps API",
    timestamp: new Date()
  });
});
app.get("/", (req, res) => {
  res.json({
    message: "EVAT DevOps API is running 🚀",
    status: "OK"
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;