"use strict";

const path = require("path");

const { storageFile } = require("./storageConfig.json");

const { readStorage, writeStorage } = require("./readerWriter");

const storageFilePath = path.join(__dirname, storageFile);

async function getAllFromStorage() {
  return readStorage(storageFilePath);
}

async function getOneFromStorage(id) {
  const storage = await readStorage(storageFilePath);
  return storage.find((item) => item.id == id) || null;
}

module.exports = { getAllFromStorage, getOneFromStorage };
