const models = require('../db/db');
const express = require('express');
const user_router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on('error', err => {
	console.log('Re-connecting lost conn: ');
	conn = mysql.createConnection(models.mysql);
})

user_router.post('/login', (req, res) => {
	const user = req.body;
	const sel_username = $sql.user.select + " where username = '" + user.username + "'";
	console.log(sel_username);
	conn.query(sel_username, (error, results) => {
		if (error) {
			console.log(error);
		}
		console.log(results)
		if (results[0] === undefined) {
			res.status(403).json({
				code: "-1",
				message: "username does not exist"
			});
		} else {
			if((parseInt(Date.now() / 1000) - results[0].block_time) < 300) {
				res.status(403).json({
					code: "2",
					message: "blocked please wait"
				});
			} else if (results[0].username == user.username && results[0].password == user.password) {
				res.status(200).json({
					code: "0",
					message: "login succeed"
				});
			} else {
				if (results[0].failed_times >= 4) {
					conn.query($sql.user.update_failed_times, [0, user.username], (error, results) => {
						if (error) {
							console.log(error);
						} else {
							console.log(Date.now());
							conn.query($sql.user.update_block_time, [parseInt(Date.now() / 1000), user.username],
								(error, results) => {
									if (error) {
										console.log(error);
									} else {
										res.status(403).json({
											code: "2",
											message: "blocked please wait"
										});
									}
								})
						}
					});
				} else {
					conn.query($sql.user.update_failed_times, [results[0].failed_times + 1, user
						.username
					], (error, results) => {
						if (error) {
							console.log(error);
						} else {
							res.status(403).json({
								code: "1",
								message: "wrong password"
							});
						}
					})
				}
			}
		}
	})
});

user_router.post('/add', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.user.select + " where username = '" + params.username + "'";
	const add_sql = $sql.user.add;
	console.log(sel_sql);

	conn.query(sel_sql, (error, results) => {
		if (error) {
			console.log(err);
		}
		if (results.length != 0 && params.username == results[0].username) {
			res.status(403).json({
				code: "-1",
				message: "username occupied"
			});
		} else {
			conn.query(add_sql, [params.username, params.email, params.password], (err, rst) => {
				if (err) {
					console.log(err);
				} else {
					console.log(rst);
					res.status(200).json({
						code: "0",
						message: "register succeed"
					});
				}
			});
		}
	});
});

module.exports = user_router;
