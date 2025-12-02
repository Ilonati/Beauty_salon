const {
    getAllCertificats,
    createCertificat,
    deleteCertificat,
    getCertificatById
} = require('../repository/certificatRepository');

exports.getCertificats = async (req, res) => {
    try {
        const data = await getAllCertificats();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erreur getCertificats:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.createCertificat = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Un fichier est requis.' });
        }

        const filePath = req.file.path.replace(/\\/g, "/");

        await createCertificat(filePath);

        res.status(201).json({ message: 'Certificat ajouté avec succès.' });

    } catch (error) {
        console.error('Erreur createCertificat:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.deleteCertificat = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getCertificatById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Certificat introuvable' });
        }

        await deleteCertificat(id);

        res.json({ message: 'Certificat supprimé avec succès.' });

    } catch (error) {
        console.error('Erreur deleteCertificat:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
