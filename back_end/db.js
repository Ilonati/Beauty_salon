
const mysql = require('mysql2/promise');
require('dotenv').config();


let pool;

(async () => {
    try {
        pool = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        console.log(' [MySQL] Connection established successfully!');
    } catch (err) {
        console.error(' [MySQL] Connection failed:', err.message);
        process.exit(1);
    }
})();

module.exports = {
    query: async (sql, params) => {
        if (!pool) throw new Error('Database not connected');
        const [rows] = await pool.execute(sql, params);
        return rows;
    },
};

// try {
//     const db = mysql.createPool({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,

//     });
//     console.log("Connected to MySQL!");
// } catch (error) {
//     console.error("Connection error:", error.message);
//     process.exit(1);
// }
// module.exports = db;







