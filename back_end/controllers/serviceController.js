const {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require('../repository/serviceRepository');

// GET ALL SERVICES
exports.getServices = async (req, res) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error) {
        console.error('Erreur getServices:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// GET SERVICE BY ID 
exports.getService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await getServiceById(id);

        if (service.length === 0) {
            return res.status(404).json({ message: 'Service introuvable' });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error('Erreur getService:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// CREATE SERVICE
exports.createService = async (req, res) => {
    try {
        const { nom, description, img_url, duree, prix, id_type } = req.body;

        if (!nom) {
            return res.status(400).json({ message: 'Le nom du service est requis.' });
        }

        await createService(nom, description, img_url, duree, prix, id_type);

        res.status(201).json({ message: 'Service ajouté avec succès.' });
    } catch (error) {
        console.error('Erreur createService:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

//UPDATE SERVICE
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, img_url, duree, prix, id_type } = req.body;

        const existing = await getServiceById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Service introuvable' });
        }

        await updateService(id, nom, description, img_url, duree, prix, id_type);

        res.json({ message: 'Service mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur updateService:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// DELETE SERVICE
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getServiceById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Service introuvable' });
        }

        await deleteService(id);

        res.json({ message: 'Service supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur deleteService:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
