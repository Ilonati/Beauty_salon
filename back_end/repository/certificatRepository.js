const db = require('../db');

exports.getAllCertificats = async () => {
    return await db.query("SELECT * FROM certificats");
};

exports.getCertificatById = async (id) => {
    return await db.query("SELECT * FROM certificats WHERE id_certificat = ?", [id]);
};

exports.createCertificat = async (titre, fichier_url) => {
    return await db.query(
        "INSERT INTO certificats (titre, fichier_url) VALUES (?, ?)",
        [titre, fichier_url]
    );
};

exports.deleteCertificat = async (id) => {
    return await db.query(
        "DELETE FROM certificats WHERE id_certificat = ?",
        [id]
    );
};
