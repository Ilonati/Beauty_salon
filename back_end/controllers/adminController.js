
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const { findUserByEmail, createUser } = require('../repository/userRepository');

// REGISTER 

exports.register = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        if (!email || !mot_de_passe) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }

        const existingUsers = await findUserByEmail(email);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Utilisateur existe déjà' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        await createUser(email, hashedPassword);

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });

    } catch (error) {
        console.error('Erreur enregistrement:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

//  LOGIN

exports.login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        const users = await findUserByEmail(email);

        if (users.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id_user: user.id_user, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ message: "Connexion réussie", token });

    } catch (error) {
        console.error("Erreur login:", error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        // берем email из URL или из body
        const email = req.params.email || req.body.email;

        if (!email) {
            return res.status(400).json({ message: 'Email requis pour supprimer un utilisateur.' });
        }

        const users = await findUserByEmail(email);

        if (users.length === 0) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }

        await db.query('DELETE FROM user WHERE email = ?', [email]);

        return res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });

    } catch (error) {
        console.error('Erreur deleteUser:', error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

