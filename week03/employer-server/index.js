"use strict";

const http = require("http");
const path = require("path");

const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new Datastorage();

const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageviews"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allPersons", { result: data }))
);

app.get("/getPerson", (req, res) =>
  res.render("getPerson", { title: "Get", header: "Get", action: "/getPerson" })
);

app.post("/getPerson", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const employeeId = req.body.id;
  dataStorage
    .getOne(employeeId)
    .then((employee) => res.render("personPage", { result: employee }))
    .catch((error) => sendErrorPage(res, error));
});

server.listen(port, host, () => console.log(`${host}:${port} serving...`));

function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}

function sendStatusPage(res, status, title = "status", header = "status") {
  return res.render("statusPage", { title, header, status });
}
