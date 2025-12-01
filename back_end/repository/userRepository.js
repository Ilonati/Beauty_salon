// const { sign } = require('jsonwebtoken')
// const db = require('../db')

// exports.findUserByEmail = async (email) => {
//     const resultUser = await db.query('SELECT * FROM user WHERE email = ?', [email]);
//     return resultUser
// }
// exports.createUser = async (email, hashedPassword) => {
//     const result = await db.query('INSERT INTO user (email, mot_de_passe) VALUES (?, ?)', [email, hashedPassword]);
//     return result
// }
const db = require('../db');

exports.findUserByEmail = async (email) => {
    const result = await db.query(
        'SELECT * FROM user WHERE email = ?',
        [email]
    );
    return result;
};

exports.createUser = async (email, hashedPassword) => {
    const result = await db.query(
        'INSERT INTO user (email, mot_de_passe) VALUES (?, ?)',
        [email, hashedPassword]
    );
    return result;
};
