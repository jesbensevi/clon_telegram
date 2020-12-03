const db = require("mongoose");
const Model = require("./model");

db.Promise = global.Promise;

db.connect(
  "MONGOURL://", // url mondodb database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
console.log("DB: connet");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessage(filterUser) {
  let filter = {};
  if (filterUser != null) {
    filter = { user: filterUser };
  }
  const messages = await Model.find(filter);
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

async function deleteMessage(id) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage != null ? foundMessage.deleteOne() : null;
  // if(foundMessage == null){

  // }else{
  //   foundMessage.deleteOne();

  // }
}

module.exports = {
  add: addMessage,
  list: getMessage,
  updateText: updateText,
  delete: deleteMessage,
};
