const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const express = require('express');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);
var app = new express();
app.use(express.static(publicPath));
app.listen(port, () => {
  console.log('Server is up on port ', port);
});
