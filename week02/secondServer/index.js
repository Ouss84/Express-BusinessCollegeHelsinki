"use strict";

const http = require("http");
const express = require("express");

const app = express();

const port = 3000;
const host = "localhost";

const server = http.createServer(app);
app.get("/", (req, res) => res.sendFile("Hello world"));

server.listen(port, host, () => console.log(`Servering ${host}:${port}`));
