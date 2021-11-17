"use strict";

const path = require("path");
const http = require("http");

const express = require("express");
const app = express();

const { port, host } = require("./config.json");

const homePath = path.join(__dirname, "home.html");
const pageBpath = path.join(__dirname, "pageB.html");

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(homePath));
app.get("/someotherpage", (req, res) => res.sendFile(pageBpath));

server.listen(port, host, () => console.log(`${host}:${port} serving`));
