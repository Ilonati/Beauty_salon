const db = require('../db');

exports.getAllCertificats = async () => {
    return await db.query('SELECT * FROM certificats');
};

exports.createCertificat = async (img_url) => {
    return await db.query(
        'INSERT INTO certificats (img_url) VALUES (?)',
        [img_url]
    );
};

exports.deleteCertificat = async (id) => {
    return await db.query(
        'DELETE FROM certificats WHERE id_certificat = ?',
        [id]
    );
};

exports.getCertificatById = async (id) => {
    return await db.query(
        'SELECT * FROM certificats WHERE id_certificat = ?',
        [id]
    );
};
