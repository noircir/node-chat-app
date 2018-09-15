const path = require('path');
const express = require('express');

// join allows to go straight to the directory
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log('=============================');
	console.log(`Started up at port ${port}...`);
	console.log('=============================');
});