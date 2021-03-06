const ObjId = require("mongodb").ObjectID;
const store = require("./store");

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[error addMessage] no user: ");
      return reject("datos incorrectos");
    } else {
      const fullMessage = {
        user: user,
        message: message,
        date: new Date(),
      };

      console.log(fullMessage);
      store.add(fullMessage);
      resolve(fullMessage);
    }
  });
}

function getMessage(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("Invalid data");
      return false;
    } else {
      const result = await store.updateText(id, message);
      resolve(result);
    }
  });
}

function deleteMessage(id) {
  return new Promise(async (resolve, reject) => {
    if (ObjId.isValid(id)) {
      resolve(await store.delete(id));
    } else {
      reject("Id invalid!");
      return false;
    }
  });
}

module.exports = { addMessage, getMessage, updateMessage, deleteMessage };
