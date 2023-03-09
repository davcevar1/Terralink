const path = require('path');
const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'mocks/db.json'));
const middlewares = jsonServer.defaults();
server.use(jsonServer.rewriter({
  '/oauth/v2/token': '/_oauth'
}))

server.use('/marketplace', express.static(path.join(__dirname, './dist/marketplace')));

server.use(middlewares)
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})
