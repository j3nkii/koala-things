const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = new pg.Pool({
    database: 'data_base',
    //optional
    host: 'localhost',
    port: 5432,
});

// GET


// POST


// PUT


// DELETE

module.exports = koalaRouter;