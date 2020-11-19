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

function getMessage() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
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

module.exports = { addMessage, getMessage, updateMessage };
