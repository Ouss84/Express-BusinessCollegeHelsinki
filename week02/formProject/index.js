"use strict";

const path = require("path");

const express = require("express");
const app = express();

const { port, host } = require("./config.json");

const homePath = path.join(__dirname, "form.html");

app.get("/", (req, res) => res.sendFile(homePath));

app.listen(port, host, () => console.log("running....."));
