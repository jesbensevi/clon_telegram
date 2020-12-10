const Model = require("./model");

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
