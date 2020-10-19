const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookPublisher: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Book', Schema)