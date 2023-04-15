const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const app = express();

const userApi = require('./api/userApi.js');
const dataApi = require('./api/dataApi.js');


// analysis application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// analysis application/json
app.use(bodyParser.json());

app.use(cors());

//cross-domain requests
app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.use("/api/user",userApi);
app.use("/api/data",dataApi);

app.listen(10520);
console.log("success");