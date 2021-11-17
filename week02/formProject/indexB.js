"use strict";

const path = require("path");

const express = require("express");
const app = express();

const { port, host } = require("./config.json");

const homePath = path.join(__dirname, "form.html");
const loginPath = path.join(__dirname, "loginform.html");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendFile(homePath));
app.get("/loginform", (req, res) => res.sendFile(loginPath));
app.post("/", (req, res) => res.json(req.body));
app.post("/login", (req, res) => res.json(req.body));

app.listen(port, host, () => console.log("running....."));
