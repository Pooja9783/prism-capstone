const express = require("express");
const { requests } = require("../controllers/requestController");

const router = express.Router();

router.get("/requests", requests);

module.exports = router;