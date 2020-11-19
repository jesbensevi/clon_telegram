const db = require("mongoose");
const Model = require("./model");

db.Promise = global.Promise;

db.connect(
  "MONGOURL://", // url mondodb database
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
console.log("DB: connet");

function addMessage(message) {
  // list.push(message);
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessage() {
  // return list;
  const messages = await Model.find();
  return messages;
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage.message = message;
  const newMessage = foundMessage.save();
  return newMessage;
}

module.exports = { add: addMessage, list: getMessage, updateText: updateText };
