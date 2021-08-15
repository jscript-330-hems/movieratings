const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const server = express();
server.use(express.json());

server.use(cors());
server.use(routes);
server.use(express.static('static'));

module.exports = server;


