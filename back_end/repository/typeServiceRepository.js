const db = require('../db');

exports.getAllTypes = async () => {
    return await db.query('SELECT * FROM type_services');
};

exports.getTypeById = async (id) => {
    return await db.query('SELECT * FROM type_services WHERE id_type = ?', [id]);
};

exports.createType = async (nom, description, img_url) => {
    return await db.query(
        'INSERT INTO type_services (nom, description, img_url) VALUES (?, ?, ?)',
        [nom, description, img_url]
    );
};

exports.updateType = async (id, nom, description, img_url) => {
    return await db.query(
        'UPDATE type_services SET nom=?, description=?, img_url=? WHERE id_type=?',
        [nom, description, img_url, id]
    );
};

exports.deleteType = async (id) => {
    return await db.query('DELETE FROM type_services WHERE id_type = ?', [id]);
};
