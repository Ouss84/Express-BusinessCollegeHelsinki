"use strict";

const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./jsonStorage/storageLayer");

// getAllFromStorage().then(console.log).catch(console.log);
// getOneFromStorage(2).then(console.log).catch(console.log);
const empupdate = {
  id: 3,
  firstname: "MattX",
  lastname: "RiverX",
  department: "ictX",
  salary: 6000,
};
removeFromStorage(3).then(console.log).catch(console.log);
