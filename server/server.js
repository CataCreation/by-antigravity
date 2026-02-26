const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection setup
const pool = new Pool({
    user: 'your_username', // replace with your PostgreSQL username
    host: 'localhost',
    database: 'your_database', // replace with your database name
    password: 'your_password', // replace with your PostgreSQL password
    port: 5432,
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Test database connection
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
