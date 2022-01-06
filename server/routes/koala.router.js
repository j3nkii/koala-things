const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const pool = new pg.Pool({
    database: 'koalas',
    //optional
    host: 'localhost',
    port: 5432,
});

// GET all books
router.get('/', (req, res) => {
	let queryText = 'SELECT * FROM "books" ORDER BY "name";';
	pool
		.query(queryText)
		.then((result) => {
			// Sends back query results
			res.send(result.rows);
		})
		.catch((error) => {
			console.log('error getting koalas', error);
			res.sendStatus(500);
		});
});
//End GET /koalas endpoint

// POST


// PUT


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log(req.params)
    const queryText = `DELETE FROM koalas WHERE id = $1 `; //SQL code here, use $1, $2 in conjunction with the query params
    let queryParams = [req.params.id];
    pool.query(queryText, queryParams).then((dbRes) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log('DELETE failed:', err);
    })
});
module.exports = koalaRouter;