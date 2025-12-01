const db = require('../db');

exports.getAllFaq = async () => {
    return await db.query('SELECT * FROM faq');
};

exports.getFaqById = async (id) => {
    return await db.query('SELECT * FROM faq WHERE id_faq = ?', [id]);
};

exports.createFaq = async (question, reponse) => {
    return await db.query(
        'INSERT INTO faq (question, reponse) VALUES (?, ?)',
        [question, reponse]
    );
};

exports.updateFaq = async (id, question, reponse) => {
    return await db.query(
        'UPDATE faq SET question=?, reponse=? WHERE id_faq=?',
        [question, reponse, id]
    );
};

exports.deleteFaq = async (id) => {
    return await db.query('DELETE FROM faq WHERE id_faq = ?', [id]);
};
