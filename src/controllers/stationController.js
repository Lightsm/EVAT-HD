const { stations } = require("../data/store");

// Add station
exports.addStation = (req, res) => {
  const station = {
    id: stations.length + 1,
    ...req.body
  };

  stations.push(station);

  res.status(201).json(station);
};

// Get all stations
exports.getStations = (req, res) => {
  res.json(stations);
};

// Get by ID
exports.getStationById = (req, res) => {
  const station = stations.find(s => s.id == req.params.id);

  if (!station) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(station);
};