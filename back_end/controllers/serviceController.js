const db = require('../db');


exports.getServices = async (req, res) => {
    try {
        const id_service = req.params.id;
        let query = 'SELECT * FROM services';
        let params = [];

        if (id_service) {
            query += ' WHERE id_service = ?';
            params.push(id_service);
        }

        const services = await db.query(query, params);
        res.json(services);

    } catch (error) {
        console.error('Ошибка получения сервисов:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.createService = async (req, res) => {
    try {
        const { nom, description, img_url, duree, prix, id_type } = req.body;

        if (!nom) {
            return res.status(400).json({ message: 'Название сервиса обязательно' });
        }

        await db.query(
            'INSERT INTO services (nom, description, img_url, duree, prix, id_type) VALUES (?, ?, ?, ?, ?, ?)',
            [nom, description, img_url, duree, prix, id_type]
        );

        res.status(201).json({ message: 'Сервис успешно добавлен' });

    } catch (error) {
        console.error('Ошибка добавления сервиса:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, img_url, duree, prix, id_type } = req.body;

        const existing = await db.query('SELECT * FROM services WHERE id_service = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Сервис не найден' });
        }

        await db.query(
            'UPDATE services SET nom=?, description=?, img_url=?, duree=?, prix=?, id_type=? WHERE id_service=?',
            [nom, description, img_url, duree, prix, id_type, id]
        );

        res.json({ message: 'Сервис успешно обновлён' });

    } catch (error) {
        console.error('Ошибка обновления сервиса:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};


exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await db.query('SELECT * FROM services WHERE id_service = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Сервис не найден' });
        }

        await db.query('DELETE FROM services WHERE id_service = ?', [id]);
        res.json({ message: 'Сервис успешно удалён' });

    } catch (error) {
        console.error('Ошибка удаления сервиса:', error);
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};
