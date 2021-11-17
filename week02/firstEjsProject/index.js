"use strict";

const path = require("path");
const express = require("express");
const app = express();

const { port, host } = require("./config.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageTemplates"));

const menuPath = path.join(__dirname, "menu.html");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendFile(menuPath));
app.get("/personform", (req, res) =>
  res.render("form", {
    title: "Person data",
    header: "Insert data",
    action: "/handlePerson",
  })
);

app.listen(port, host, () => console.log(`${host}:${port} listening...`));
