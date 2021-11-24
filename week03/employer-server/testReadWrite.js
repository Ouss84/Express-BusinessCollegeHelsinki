"use strict";
const { readStorage, writeStorage } = require("./jsonStorage/readerWriter");
// readStorage("./jsonStorage/employees.json")
//   .then(console.log)
//   .catch(console.log);

writeStorage("./test.json", { a: 2 }).then(console.log).catch(console.log);
