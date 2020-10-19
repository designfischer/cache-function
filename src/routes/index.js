const { Router } = require('express')

const BookController = require('../controllers/BookController')

const routes = Router()

routes.get('/books/:book_id', BookController.getBook)
routes.post('/books', BookController.createBook)
routes.put('/books/:book_id', BookController.replaceBook)
routes.patch('/books/:book_id', BookController.updateBook)
routes.delete('/books/:book_id', BookController.deleteBook)

module.exports = routes