const mysql = require("mysql2/promise");
const dbConn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'pim_database',
});
// เช็คการเชื่อมต่อฐานข้อมูล
dbConn.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connection successful');
        connection.release();
    }
});

module.exports = dbConn;

