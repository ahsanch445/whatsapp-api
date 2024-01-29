const mongoose = require('mongoose');

const conversationMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  reciver: {
    type: String,
    required: true,
  },
  Converstion: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },

});

const ConversationMessage = mongoose.model('ConversationMessage', conversationMessageSchema);

module.exports = ConversationMessage;
