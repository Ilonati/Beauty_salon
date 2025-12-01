const {
    getAllTypes,
    getTypeById,
    createType,
    updateType,
    deleteType
} = require('../repository/typeServiceRepository');

exports.getTypes = async (req, res) => {
    try {
        const types = await getAllTypes();
        res.status(200).json(types);
    } catch (error) {
        console.error('Erreur getTypes:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.getTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await getTypeById(id);

        if (type.length === 0) {
            return res.status(404).json({ message: 'Type de service introuvable' });
        }

        res.status(200).json(type);
    } catch (error) {
        console.error('Erreur getTypeById:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.createType = async (req, res) => {
    try {
        const { nom, description, img_url } = req.body;

        if (!nom) {
            return res.status(400).json({ message: 'Le nom du type est requis.' });
        }

        await createType(nom, description, img_url);

        res.status(201).json({ message: 'Type de service ajouté avec succès.' });
    } catch (error) {
        console.error('Erreur createType:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, img_url } = req.body;

        const existing = await getTypeById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Type introuvable' });
        }

        await updateType(id, nom, description, img_url);

        res.json({ message: 'Type mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur updateType:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

exports.deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getTypeById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Type introuvable' });
        }

        await deleteType(id);

        res.json({ message: 'Type supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur deleteType:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
