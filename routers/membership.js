const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membership");

const studentAuth = require("../middelware/StudentAuth");

router.post("/create", membershipController.craeteMembership);

router.post("/add/:studentId", studentAuth, membershipController.addMembership);

module.exports = router;
