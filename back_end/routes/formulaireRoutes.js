const express = require("express");
const router = express.Router();
const formulaireController = require("../controllers/formulaireController");

// Route POST pour recevoir le formulaire
router.post("/", formulaireController.envoyerFormulaire);

module.exports = router;
