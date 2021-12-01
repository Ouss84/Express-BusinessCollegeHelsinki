"use strict";

const { CODES, MESSAGES } = require("./statusCodes");
const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

// Datastorage class

module.exports = class Datastorage {
  get CODES() {
    return CODES;
  } // getter end
  getAll() {
    return getAllFromStorage();
  } // getAll end
  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else {
        const result = await getOneFromStorage(id);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  } // getOne end
  insert(employee) {
    return new Promise(async (resolve, reject) => {
      if (employee) {
        if (!employee.id) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneFromStorage(employee.id)) {
          reject(MESSAGES.ALREADY_IN_USE(id));
        } else if (await addToStorage(employee)) {
          resolve(MESSAGES.INSERT_OK(employee.id));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  } //insert end
  update(employee) {
    return new Promise(async (resolve, reject) => {
      if (employee) {
        if (await updateStorage(employee)) {
          resolve(MESSAGES.UPDATE_OK(employee.id));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  } // update ends
  remove(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else if (await removeFromStorage(id)) {
        resolve(MESSAGES.REMOVE_OK(id));
      } else {
        reject(MESSAGES.NOT_REMOVED(id));
      }
    });
  } //remove ends
}; //end of class
