"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_utils_1 = require("./db_utils");
var restify = require('restify');
var server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});
var corsMiddleware = require('restify-cors-middleware');
var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});
server.get('/users', function (req, res, next) {
    console.log("got a GET users msg");
    db.getUsers(function (users) {
        res.send(users);
        return next();
    });
});
server.post('/user', function (req, res, next) {
    //res.send(req.params);
    console.log("got a POST user msg - " + req.body);
    db.insertUser(req.body.name, req.body.birthday);
});
var db = new db_utils_1.mgdXnex();
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
    db.createUsersTable();
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