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

async function addToStorage(newObject) {
  const storage = await readStorage(storageFilePath);
  storage.push(newObject);
  return await writeStorage(storageFilePath, storage);
}

async function updateStorage(updatedObject) {
  const storage = await readStorage(storageFilePath);
  const oldObject = Storage.find((item) => item.id == updatedObject.id);
  if (oldObject) {
    Object.assign(oldObject, updatedObject);
    return await writeStorage(storageFilePath, Storage);
  } else {
    return false;
  }
}
module.exports = { getAllFromStorage, getOneFromStorage, addToStorage };
