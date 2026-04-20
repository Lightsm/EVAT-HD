const { stations } = require("../data/store");

exports.findRoute = (req, res) => {
  const { start_city, end_city } = req.body;

  const result = {
    route: `${start_city} → ${end_city}`,
    suggestedStation: stations[0] || "No station available"
  };

  res.json(result);
};