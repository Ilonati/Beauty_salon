const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./db');

const app = express();

const adminRoutes = require('./routes/adminRoutes');
const certificatRoutes = require('./routes/certificatRoutes');
const galerieRoutes = require('./routes/galerieRoutes');
const faqRoutes = require('./routes/faqRoutes');
const formulaireRoutes = require('./routes/formulaireRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const typeServiceRoutes = require('./routes/typeServiceRoutes');

// CORS
app.use(cors());

// STATIC FILES 
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
    if (req.headers['content-type'] &&
        req.headers['content-type'].startsWith('multipart/form-data')) {
        return next();
    }

    express.urlencoded({ extended: true })(req, res, (err) => {
        if (err) return next(err);
        express.json()(req, res, next);
    });
});

// ROUTES
app.use('/adminRoutes', adminRoutes);
app.use('/certificatRoutes', certificatRoutes);
app.use('/galerieRoutes', galerieRoutes);
app.use('/faqRoutes', faqRoutes);
app.use('/formulaireRoutes', formulaireRoutes);
app.use('/serviceRoutes', serviceRoutes);
app.use('/typeServiceRoutes', typeServiceRoutes);

// TEST ROUTES
app.get('/', (req, res) => {
    res.send('Institut Beauté API is running...');
});
// Test DB connection route
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() AS currentTime');
        res.json({ message: 'Database connected', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const db = require('./db');

// const app = express();

// const adminRoutes = require('./routes/adminRoutes');
// const certificatRoutes = require('./routes/certificatRoutes');
// const faqRoutes = require('./routes/faqRoutes');
// const formulaireRoutes = require('./routes/formulaireRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');
// const typeServiceRoutes = require('./routes/typeServiceRoutes');



// // Test route
// app.get('/', (req, res) => {
//     res.send('Institut Beauté API is running...');
// });

// // Test DB connection route
// app.get('/api/test-db', async (req, res) => {
//     try {
//         const result = await db.query('SELECT NOW() AS currentTime');
//         res.json({ message: 'Database connected', result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Routes
// app.use('/adminRoutes', adminRoutes);
// app.use('/certificatRoutes', certificatRoutes);
// app.use('/uploads', express.static('uploads'));
// app.use('/faqRoutes', faqRoutes);
// app.use('/formulaireRoutes', formulaireRoutes);
// app.use('/serviceRoutes', serviceRoutes);
// app.use('/typeServiceRoutes', typeServiceRoutes);

// // Middleware
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());



// // Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });




