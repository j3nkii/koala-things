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



// GET 
koalaRouter.get('/', (req, res) => {
	let queryText = 'SELECT * FROM "koalas" ORDER BY "name";';
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



// POST to add new koala to database
koalaRouter.post('/', (req, res) => {
	let newKoala = req.body;
	console.log(`Adding koala:`, newKoala);

	let queryText = `INSERT INTO "koalas" 
                        ("name", "gender", "age", "ready_to_transfer", "notes")
                    VALUES ($1, $2, $3, $4, $5);
                    `;

	pool
		.query(queryText, [ newKoala.name,
                            newKoala.gender,
                            newKoala.age,
                            newKoala.ready_to_transfer,
                            newKoala.notes
                            ])
		.then((result) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(`Error adding new koala`, error);
			res.sendStatus(500);
		});
});
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