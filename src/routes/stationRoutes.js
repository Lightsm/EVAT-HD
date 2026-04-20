const router = require("express").Router();
const {
  addStation,
  getStations,
  getStationById,
} = require("../controllers/stationController");

router.post("/", addStation);
router.get("/", getStations);
router.get("/:id", getStationById);

module.exports = router;