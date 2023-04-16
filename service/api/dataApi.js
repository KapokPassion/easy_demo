const models = require('../db/db');
const express = require('express');
const data_router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on('error',err=>{
	console.log('Re-connecting lost conn: ');
	conn = mysql.createConnection(models.mysql);
})

// load data
data_router.post('/loaddata', (req, res) => {
	const sel_data = $sql.data.load;
	console.log(sel_data);
	conn.query(sel_data, (error, results) => {
		if (error) {
			console.log(error);
			res.json({
				code: "1",
			});
		} else {
			console.log('<Folded>');
			res.json({
				code: "0",
				data: results
			});
		}
	})
});

// edit
data_router.post('/edit', (req, res) => {
	const data = req.body
	if (data.id == -1) {
		const sel_add = $sql.data.add;
		console.log(sel_add);
		console.log(data);
		conn.query(sel_add, [data.mean_radius, data.mean_texture, data.mean_perimeter, data.mean_area, data.mean_smoothness, data.diagnosis], (error, results) => {
			if (error) {
				console.log(error);
				res.json({
					code: "1"
				});
			} else {
				conn.query("SELECT LAST_INSERT_ID();", (err, results) => {
					if (err) {
						res.json({
							code: "0",
							id: 0
						});
					} else {
						res.json({
							code: "0",
							id: results[0]['LAST_INSERT_ID()']
						});
					}
				});
			}
		})
	} else {
		const sel_edit = $sql.data.edit;
		console.log(sel_edit);
		conn.query(sel_edit, [data.mean_radius, data.mean_texture, data.mean_perimeter, data.mean_area, data.mean_smoothness, data.diagnosis, data.id], (error, results) => {
			if (error) {
				console.log(error);
				res.json({
					code: "1"
				});
			}
			res.json({
				code: "0"
			});
		})
	}
});

// delete
data_router.post('/delete', (req, res) => {
	const data = req.body
	const sel_delete = $sql.data.delete;
	console.log(sel_delete);
	conn.query(sel_delete, [data.id], (error, results) => {
		if (error) {
			console.log(error);
			res.json({
				code: "1"
			});
		}
		res.json({
			code: "0"
		});
	})
});

// recover
data_router.post('/recover', (req, res) => {
	const data = req.body
	const sel_recover1 = $sql.data.recover1;
	console.log(sel_recover1);
	conn.query(sel_recover1, (error1, results1) => {
		if (error1) {
			console.log(error1);
			res.json({
				code: "1"
			});
		} else {
			const sel_recover2 = $sql.data.recover2;
			console.log(sel_recover2);
			conn.query(sel_recover2, (error2, results2) => {
				if (error2) {
					console.log(error2);
					res.json({
						code: "1"
					});
				} else {
					const sel_recover3 = $sql.data.recover3;
					console.log(sel_recover3);
					conn.query(sel_recover3, (error3, results3) => {
						if (error3) {
							console.log(error3);
							res.json({
								code: "1"
							});
						}
						res.json({
							code: "0"
						});
					})
				}
			})
		}
	})
	
	
});

module.exports = data_router;
