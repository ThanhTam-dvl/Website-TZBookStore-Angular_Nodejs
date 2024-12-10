const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookstoredb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Add error handler
db.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Reconnect if connection is lost
        db.connect();
    } else {
        throw err;
    }
});

module.exports = db;
