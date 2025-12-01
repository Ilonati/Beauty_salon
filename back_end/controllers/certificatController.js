const {
    getAllCertificats,
    getCertificatById,
    createCertificat,
    deleteCertificat
} = require('../repository/certificatRepository');

// GET all certificates
exports.getCertificats = async (req, res) => {
    try {
        const data = await getAllCertificats();
        res.status(200).json(data);
    } catch (error) {
        console.error("Erreur getCertificats:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// GET certificate by ID
exports.getCertificat = async (req, res) => {
    try {
        const { id } = req.params;
        const certificat = await getCertificatById(id);

        if (certificat.length === 0) {
            return res.status(404).json({ message: "Certificat introuvable" });
        }

        res.status(200).json(certificat[0]);
    } catch (error) {
        console.error("Erreur getCertificat:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// CREATE certificate (with file)
exports.createCertificat = async (req, res) => {
    try {
        const { titre } = req.body;

        if (!titre) {
            return res.status(400).json({ message: "Titre requis." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Un fichier est requis." });
        }

        const fichier_url = `/uploads/${req.file.filename}`;

        await createCertificat(titre, fichier_url);

        res.status(201).json({
            message: "Certificat ajouté avec succès.",
            fichier_url
        });

    } catch (error) {
        console.error("Erreur createCertificat:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// DELETE certificate
exports.deleteCertificat = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getCertificatById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: "Certificat introuvable" });
        }

        await deleteCertificat(id);

        res.json({ message: "Certificat supprimé avec succès." });

    } catch (error) {
        console.error("Erreur deleteCertificat:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
