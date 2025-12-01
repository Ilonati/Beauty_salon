const db = require('../db');

exports.getAllServices = async () => {
    return await db.query('SELECT * FROM services');
};

exports.getServiceById = async (id) => {
    return await db.query('SELECT * FROM services WHERE id_service = ?', [id]);
};

exports.createService = async (nom, description, img_url, duree, prix, id_type) => {
    return await db.query(
        'INSERT INTO services (nom, description, img_url, duree, prix, id_type) VALUES (?, ?, ?, ?, ?, ?)',
        [nom, description, img_url, duree, prix, id_type]
    );
};

exports.updateService = async (id, nom, description, img_url, duree, prix, id_type) => {
    return await db.query(
        'UPDATE services SET nom=?, description=?, img_url=?, duree=?, prix=?, id_type=? WHERE id_service=?',
        [nom, description, img_url, duree, prix, id_type, id]
    );
};

exports.deleteService = async (id) => {
    return await db.query('DELETE FROM services WHERE id_service = ?', [id]);
};
