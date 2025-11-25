const db = require('../db');


exports.getTypes = async (req, res) => {
    try {
        const types = await db.query('SELECT * FROM type_services');

        res.status(200).json(types);
    } catch (error) {
        console.error('Ошибка получения типов сервисов:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.getTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const types = await db.query('SELECT * FROM type_services WHERE id_type = ?', [id]);
        res.status(200).json(types);
    } catch (error) {
        console.error('Ошибка получения типа сервиса:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.createType = async (req, res) => {
    try {
        const { nom, description, img_url } = req.body;

        if (!nom) {
            return res.status(400).json({ message: 'Название типа обязательно' });
        }

        await db.query(
            'INSERT INTO type_services (nom, description, img_url) VALUES (?, ?, ?)',
            [nom, description, img_url]
        );

        res.status(201).json({ message: 'Тип сервиса успешно добавлен' });
    } catch (error) {
        console.error('Ошибка добавления типа:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, img_url } = req.body;

        const existing = await db.query('SELECT * FROM type_services WHERE id_type = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Тип сервиса не найден' });
        }

        await db.query(
            'UPDATE type_services SET nom=?, description=?, img_url=? WHERE id_type=?',
            [nom, description, img_url, id]
        );

        res.json({ message: 'Тип сервиса успешно обновлён' });
    } catch (error) {
        console.error('Ошибка обновления типа:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await db.query('SELECT * FROM type_services WHERE id_type = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Тип сервиса не найден' });
        }

        await db.query('DELETE FROM type_services WHERE id_type = ?', [id]);
        res.json({ message: 'Тип сервиса успешно удалён' });
    } catch (error) {
        console.error('Ошибка удаления типа:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};
