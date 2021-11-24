"use strict";

const {
  getAllFromStorage,
  getOneFromStorage,
} = require("./jsonStorage/storageLayer");

// getAllFromStorage().then(console.log).catch(console.log);
getOneFromStorage(2).then(console.log).catch(console.log);
