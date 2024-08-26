const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const emailSchema = new Schema({
    from: String,
    to: String,
    subject: String,
    message: String,

}, {
    timestamps: true
})

const Email = model('Email', emailSchema);
module.exports = Email;
