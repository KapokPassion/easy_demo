const models = require('../db/db');
const express = require('express');
const user_router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

let conn = mysql.createConnection(models.mysql);
conn.connect();
conn.on('error',err=>{
	console.log('Re-connecting lost conn: ');
	conn = mysql.createConnection(models.mysql);
})

user_router.post('/login',(req,res)=>{
	const user = req.body;
	const sel_username = $sql.user.select + " where username = '" + user.username + "'";
	console.log(sel_username);
	conn.query(sel_username, (error, results)=>{
		if (error) {
			console.log(error);
		}
		console.log(results)
		if (results[0] === undefined) {
			
			res.json({code:"-1", message:"username does not exist"});
		} else{
			if (results[0].username == user.username && results[0].password == user.password) {
				res.json({code:"0", message:"login succeed"});
			} else{
				res.json({code:"1", message:"wrong password"});
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
		if(error) {
			console.log(err);
		}
		if (results.length != 0 && params.username == results[0].username) {
			res.json({code:"-1", message:"username occupied"});
		} else {
			conn.query(add_sql, [params.username, params.email, params.password], (err, rst) => {
				if (err) {
					console.log(err);
				} else{
					console.log(rst);
					res.json({code:"0", message:"register succeed"});
				}
			});
		}
	});
});

module.exports = user_router;