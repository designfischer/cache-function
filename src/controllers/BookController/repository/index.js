const Book = require('../../../models/Book')

const database = {
    
    async findBookById(book_id) {

        const book = await Book.findById(book_id)

        return book

    },

    async findBookByTitle(title) {

        const book = await Book.findOne({ bookTitle: title })

        return book

    },

    async createBook(book_data) {

        const book = await Book.create(book_data)

        return book

    },

    async findBookByIdAndUpdate(book_id, book_data) {        

        const book = await Book.findByIdAndUpdate(book_id, book_data, { new: true })

        return book

    },

    async findBookByIdAndRemove(book_id) {

        const book = await Book.findByIdAndRemove(book_id)

        return book

    }

}

module.exports = database