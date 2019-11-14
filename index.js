"use strict";
// See: https://codeshack.io/basic-login-system-nodejs-express-mysql/
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || '3000';

const app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  if (request.session.loggedin) {
    response.redirect('/consult');
  } else {
    response.sendFile(path.join(__dirname + '/login.html'));
  }
});

app.get('/consult', function(request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + '/consult.html'));
  } else {
    const login = `<a href="http://localhost:${port}/">login</a>`;
    response.send(`Please ${login} to view this page!`).end();
  }
});

app.post('/consult', function(request, response) {
  if (!request.session.loggedin) {
    response.status(404).send('You must be logged in to access this.');
  } else {
    response.status(200).send('You entered ' + JSON.stringify(request.body));
  }
  response.end();
});

app.post('/auth', function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  if (username && password) {
    request.session.loggedin = true;
    request.session.username = username;
    response.redirect('/');
  } else {
    response.send('Please enter Username and Password!');
  }
  response.end();
});

app.listen(port);
