const express = require("express");
const router = express.Router();
const galerieController = require("../controllers/galerieController");
const uploadGalerie = require("../middleware/uploadGalerie");
const authenticateToken = require('../middleware/auth');

// GET
router.get("/", galerieController.getPhotos);
router.get("/:categorie", galerieController.getPhotos);

// POST
router.post("/", authenticateToken, uploadGalerie.single("fichier"), galerieController.uploadPhoto);

// DELETE 
router.delete("/:id", authenticateToken, galerieController.deletePhoto);

module.exports = router;
