"use strict";

const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
} = require("./jsonStorage/storageLayer");

// getAllFromStorage().then(console.log).catch(console.log);
// getOneFromStorage(2).then(console.log).catch(console.log);
const emp = {
  id: 3,
  firstname: "MattX",
  lastname: "RiverX",
  department: "ictX",
  salary: 5000,
};
addToStorage(emp).then(console.log).catch(console.log);
