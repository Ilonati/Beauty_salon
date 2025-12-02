const {
    getAllPhotos,
    getPhotosByCategorie,
    addPhoto,
    deletePhoto
} = require('../repository/galerieRepository');

exports.getPhotos = async (req, res) => {
    try {
        const { categorie } = req.params;

        if (categorie) {
            const data = await getPhotosByCategorie(categorie);
            return res.json(data);
        }

        const data = await getAllPhotos();
        res.json(data);

    } catch (error) {
        console.error("Erreur getPhotos:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Fichier requis." });
        }

        const { categorie } = req.body;

        const img_url = req.file.path.replace(/\\/g, "/");

        await addPhoto(categorie, img_url);

        res.status(201).json({ message: "Photo ajoutée avec succès !" });

    } catch (error) {
        console.error("Erreur uploadPhoto:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;

        await deletePhoto(id);

        res.json({ message: "Photo supprimée." });

    } catch (error) {
        console.error("Erreur deletePhoto:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
