
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8000);

//function to handle get requests
app.get('/assignment', function(req,res){
  var queryParams = [];
  for(var param in req.query){
    queryParams.push({'name' : param, 'value' : req.query[param]})
  }
  var context = {};
  context.title = 'GET';
  context.dataReceived = queryParams;
  res.render('assignment', context);
});

//function to handle post requests in the form of url encoded or json content
app.post('/assignment', function(req, res){
  var queryParams = [];
  for(var param in req.body){
    queryParams.push({'name': param, 'value': req.body[param]})
  }
  var context = {};
  context.title = 'POST';
  context.dataReceived = queryParams;
  res.render('assignment', context);
});

//invalid url error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//server error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//server start
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
