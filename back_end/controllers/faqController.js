const {
    getAllFaq,
    getFaqById,
    createFaq,
    updateFaq,
    deleteFaq
} = require('../repository/faqRepository');

// GET ALL 
exports.getFaqs = async (req, res) => {
    try {
        const faqs = await getAllFaq();
        res.status(200).json(faqs);
    } catch (error) {
        console.error("Erreur getFaqs:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

//  GET ONE 
exports.getFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await getFaqById(id);

        if (faq.length === 0) {
            return res.status(404).json({ message: "FAQ introuvable" });
        }

        res.status(200).json(faq[0]);

    } catch (error) {
        console.error("Erreur getFaq:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// CREATE
exports.createFaq = async (req, res) => {
    try {
        const { question, reponse } = req.body;

        if (!question) {
            return res.status(400).json({ message: "La question est requise." });
        }

        await createFaq(question, reponse);

        res.status(201).json({ message: "FAQ ajoutée avec succès." });

    } catch (error) {
        console.error("Erreur createFaq:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// UPDATE
exports.updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, reponse } = req.body;

        const existing = await getFaqById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: "FAQ introuvable" });
        }

        await updateFaq(id, question, reponse);

        res.json({ message: "FAQ mise à jour avec succès." });

    } catch (error) {
        console.error("Erreur updateFaq:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// DELETE 
exports.deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getFaqById(id);
        if (existing.length === 0) {
            return res.status(404).json({ message: "FAQ introuvable" });
        }

        await deleteFaq(id);

        res.json({ message: "FAQ supprimée avec succès." });

    } catch (error) {
        console.error("Erreur deleteFaq:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
