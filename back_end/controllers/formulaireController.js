const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
    const { name, prenom, email, telephone, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "beauty.salon.tyrosse@gmail.com",
                pass: "pzwf hyrp trqy lshy" // пароль приложения Gmail !!!
            }
        });

        // 1️⃣ Письмо, которое получаешь ТЫ
        const adminMail = {
            from: `"Beauty Salon" <beauty.salon.tyrosse@gmail.com>`,
            to: "beauty.salon.tyrosse@gmail.com",
            subject: `Nouveau message: ${subject}`,
            html: `
                <h2>Nouveau message du site Beauty Salon</h2>
                <p><b>Nom:</b> ${name}</p>
                <p><b>Prénom:</b> ${prenom}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Téléphone:</b> ${telephone}</p>
                <p><b>Sujet:</b> ${subject}</p>
                <p><b>Message:</b><br>${message}</p>
            `,
        };

        // 2️⃣ Автоматическое письмо клиенту
        const clientMail = {
            from: `"Beauty Salon" <beauty.salon.tyrosse@gmail.com>`,
            to: email, // email клиента
            subject: "Votre message a bien été reçu ✔️",
            html: `
                <h2>Merci pour votre message !</h2>
                <p>Bonjour ${prenom},</p>
                <p>Merci de m’avoir contactée. Votre message a bien été reçu.</p>
                <p>Je vous répondrai dans les plus brefs délais.</p>
                <br>
                <p>Cordialement,</p>
                <p><b>Beauty Salon Tyrosse</b></p>
            `,
        };

        // Отправляем письма
        await transporter.sendMail(adminMail);   // письмо тебе
        await transporter.sendMail(clientMail);  // письмо клиенту

        res.status(200).json({ success: true, message: "Email envoyé et confirmation envoyée !" });

    } catch (error) {
        console.error("Erreur envoi mail:", error);
        res.status(500).json({ success: false, message: "Erreur serveur", error });
    }
};
