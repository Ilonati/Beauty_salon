const db = require('../db');

exports.getAllPhotos = async () => {
    return await db.query("SELECT * FROM galerie");
};

exports.getPhotosByCategorie = async (categorie) => {
    return await db.query("SELECT * FROM galerie WHERE categorie = ?", [categorie]);
};

exports.addPhoto = async (categorie, img_url) => {
    return await db.query(
        "INSERT INTO galerie (categorie, img_url) VALUES (?, ?)",
        [categorie, img_url]
    );
};

exports.deletePhoto = async (id) => {
    return await db.query("DELETE FROM galerie WHERE id_photo = ?", [id]);
};
