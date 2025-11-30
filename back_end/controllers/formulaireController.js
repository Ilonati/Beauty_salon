const db = require("../db");
const nodemailer = require("nodemailer");

exports.envoyerFormulaire = async (req, res) => {
    const { nom, prenom, email, telephone, sujet, message } = req.body;

    try {
        //  Enregistrement dans la base
        const sql = `
            INSERT INTO formulaire (nom, prenom, email, telephone, sujet, message)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [nom, prenom, email, telephone, sujet, message]);

        //  Envoi de l’email
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Beauty Salon" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO,
            subject: " Nouveau message du site",
            html: `
                <h2>Nouveau message reçu</h2>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Prénom :</strong> ${prenom}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone}</p>
                <p><strong>Sujet :</strong> ${sujet}</p>
                <p><strong>Message :</strong><br>${message}</p>
            `
        });

        res.json({ success: true, message: "Message envoyé et enregistré" });

    } catch (err) {
        console.error(" Erreur formulaire:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
