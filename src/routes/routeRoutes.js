const router = require("express").Router();
const { findRoute } = require("../controllers/routeController");

router.post("/find", findRoute);

module.exports = router;