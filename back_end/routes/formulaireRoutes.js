const express = require("express");
const router = express.Router();
const formulaireController = require("../controllers/formulaireController");

router.post("/send", formulaireController.sendMail);

module.exports = router;
