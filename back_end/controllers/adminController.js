

const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail, createUser } = require('../repository/userRepository');


exports.register = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        if (!email || !mot_de_passe) {
            return res.status(400).json({ message: 'Email et un mot de passe sont requis.' });
        }

        const existingUsers = findUserByEmail(email);
        // const existingUsers = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User existe déjà' });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const result = createUser(email, hashedPassword);
        // await db.query('INSERT INTO user (email, mot_de_passe) VALUES (?, ?)', [email, hashedPassword]);

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });

    } catch (error) {
        console.error('Erreur enregistrement:', error);
        res.status(500).json({ message: 'Erreur de serveur', error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        const users = await db.query('SELECT * FROM user WHERE email = ?', [email]);
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

        res.json({ message: "Connexion réussie ", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {

        const email = req.body.email || req.params.email;

        if (!email) {
            return res.status(400).json({ message: 'Email requis' });
        }


        const existingUsers = await db.query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUsers.length === 0) {
            return res.status(404).json({ message: 'utilisateur introuvable' });
        }


        await db.query('DELETE FROM user WHERE email = ?', [email]);

        res.status(200).json({ message: 'utilisateur a été supprimé avec succès.' });

    } catch (error) {
        console.error('Erreur lors de la suppression de utilisateur:', error);
        res.status(500).json({ message: 'Erreur de serveur', error: error.message });
    }
};
