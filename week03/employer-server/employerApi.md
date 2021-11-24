# Employee data storage

## employees.json

The id is unique

```json
[
  {
    "id": 1,
    "firstname": "Leila",
    "lastname": "Hökki",
    "department": "ict",
    "salary": 4000
  },
  {
    "id": 2,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
  }
]
```

### Public API (methods of Datastorage)

#### dataStorageLayer.js

- getAll()
  - returns an array of all employees / [] (if nothing is found).
- getOne(id)
  - returns an employee object / NOT_FOUND
- insert(newEmployee)
  - returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE
- update(updatedEmployee)
  - returns UPDATE_OK / NOT_UPDATED
- remove(id)
  - returns REMOVE_OK / NOT_FOUND / NOT_REMOVED
- getter for status codes
  - returns the status codes.

### Private API

#### readerWriter.js

- readStorage(storageFile)
  - returns an array of employees / []
- writeStorage(storageFile, data)
  - returns true / false

#### storageLayer.js

- getAllFromStorage()
  - returns an array of employees / []
- getOneFromStorage(id)
  - returns an employee object / null
- addToStorage(newEmployee)
  - returns true / false
- updateStorage (updatedEmplyee)
  - returns true / false
- removefromStorage (id)
  - returns true / false

### status codes and messages

```js
const CODES ={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ....
}
```

- The Format of an status message is:
  (status types are `error` or `info`)

```js
const MESSAGE = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (id) => ({
    message: `No employee found with ${id}`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `Employee ${id} was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
};
```
