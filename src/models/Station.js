const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
    availablePorts: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);