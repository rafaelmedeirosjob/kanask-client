// server.js
var express = require('express');
var cors = require('cors');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(cors())
app.get('/', function(req, res){
    res.redirect('/kanban');
 });
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);