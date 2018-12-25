var myoptions = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pgpassword',
        database: 'pgdb'
    }
};
var knex = require('knex')(myoptions);
knex.schema.createTable('cars', function (table) {
    table.increments('id');
    table.string('name');
    table.integer('price');
}).then(function () { return console.log("table created"); })
    .catch(function (err) { console.log(err); throw err; })
    .finally(function () {
    console.log("finally of createTable called");
});
knex('cars').insert({
    name: "toyt",
    price: 100
}).then(function () {
    console.log("insert done");
}).catch(function (err) {
    console.log(err);
});
var restify = require('restify');
var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});
server.post('/user', function (req, res, next) {
    //res.send(req.params);
    knex('cars').insert({
        name: req.body.name,
        price: req.body.price
    }).then(function () {
        console.log("insert done");
    }).catch(function (err) {
        console.log(err);
    });
    return next();
});
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
/*
var http = require('http');
//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

/*
  var express = require('express');
  var bodyParser = require('body-parser');
  var port = process.env.PORT || 8001;
  var knex = require('./knexfile');
  var cors = require('cors');
  var logger = require('morgan');
 /*
  var app = express();
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.get('/todos', function(req, res) {
    knex.select()
        .from('todos')
        .then(function(todos) {
          res.send(todos);
        })
  })
  
  app.get('/todos-of-user/:id', function(req, res) {
    knex.from('todos')
        .innerJoin('users', 'todos.user_id', 'users.id')
        .where('todos.user_id', req.params.id)
        .then(function(data) {
          res.send(data)
        })
  })
  
  app.get('/todos/:id', function(req, res) {
    knex.select()
        .from('todos')
        .where('id', req.params.id)
        .then(function(todos) {
          res.send(todos);
        })
  })
  
  app.post('/todos', function(req, res) {
    knex('todos').insert({
      title: req.body.title,
      user_id: req.body.user_id
    })
    .then(function() {
      knex.select()
          .from('todos')
          .then(function(todos) {
            res.send(todos);
          })
    })
  })
  
  app.put('/todos/:id', function(req, res) {
    knex('todos').where('id', req.params.id)
                .update({
                  title: req.body.title,
                  completed: req.body.completed
                })
                .then(function() {
                  knex.select()
                      .from('todos')
                      .then(function(todos) {
                        res.send(todos);
                      })
                })
  })
  
  app.delete('/todos/:id', function(req, res) {
    knex('todos').where('id', req.params.id)
                 .del()
                 .then(function() {
                   knex.select()
                       .from('todos')
                       .then(function(todos) {
                         res.send(todos);
                       })
                 });
  })

  
  
  app.listen(port, function() {
    console.log("listening on port: ", port);
  })
*/ 
//# sourceMappingURL=app.js.map