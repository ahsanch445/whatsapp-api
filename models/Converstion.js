const mongoose = require("mongoose");

const converstionSchema = mongoose.Schema({
    conver: {
        type: Array
    },
    massage: {
        type: String
    }
}, {
    timestamps: true // This will add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model("converstion", converstionSchema);