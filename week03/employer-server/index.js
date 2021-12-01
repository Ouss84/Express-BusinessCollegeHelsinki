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

app.get("/removeperson", (req, res) =>
  res.render("getPerson", {
    title: "Remove",
    header: "Remove a person",
    action: "/removeperson",
  })
);

app.post("/removeperson", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const employeeId = req.body.id;
  dataStorage
    .remove(employeeId)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendStatusPage(res, error));
});

app.get("/inputform", (req,res)=>res.render("form",{
  title:"Add employee",
  header: "Add new employee",
  action:"/insert",
  id:{value:"", readonly:""},
  firstname:{value:"",readonly:""},
  lastname:{value:"",readonly:""},
  department:{value:"",readonly:""},
  salary:{value:"",readonly:""},
}));

app.post("/insert",(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.insert(req.body).then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorPage(res,error));
})
app.get("/updateform", (req,res)=>res.render("form",{
  title:"Update employee",
  header: "Update employee data",
  action:"/updatedata",
  id:{value:"", readonly:""},
  firstname:{value:"",readonly:"readonly"},
  lastname:{value:"",readonly:"readonly"},
  department:{value:"",readonly:"readonly"},
  salary:{value:"",readonly:"readonly"},
}));

app.post("/updatedata",(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.getOne(req.body.id).then(employee=>res.render("form",{
    title:"Update Employee",
    header:"Update employee data",
    action:"/update",
    id:{value:employee.id,readonly:"readonly"},
    firstname:{value:employee.firstname, readonly:""},
    lastname:{value:employee.lastname, readonly:""},
    department:{value:employee.department, readonly:""},
    salary:{value:employee.salary, readonly:""},
  }))
  .catch(error=>sendErrorPage(res,error));
})

app.post("/update",(req,res)=>{
  if(!req.body) res.sendStatus(500);
  dataStorage.update(req.body).then(status=>sendStatusPage(res,status))
  .catch(error=>sendErrorPage(res,error));
})

server.listen(port, host, () => console.log(`${host}:${port} serving...`));

function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}

function sendStatusPage(res, status, title = "status", header = "status") {
  return res.render("statusPage", { title, header, status });
}
