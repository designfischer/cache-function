const database = require('./repository')
const cache = require('./cache')

const BookController = {

    async getBook(req, res) {

        const { book_id } = req.params
        
        try {    
            
            const existingCache = await cache.getCache(book_id)    

            if (existingCache) return res.status(200).json(existingCache)            

            const existingBook = await database.findBookById(book_id)

            if (!existingBook) return res.status(400).json({
                message: 'Book does not exist'                
            })

            const book = existingBook

            const response = {
                book_id,                
                data: book
            }
          
            await cache.setCache(response)

            return res.status(200).json(response)

        } catch(err) {

            return res.status(400).json(err)

        }
    },

    async createBook(req, res) {

        const bookData = req.body
    
        try {            

            const existingBook = await database.findBookByTitle(bookData.bookTitle)

            if (existingBook) return res.status(409).json({
                message: 'Book already exists'                
            })            
    
            const createdBook = await database.createBook(bookData)

            const response = {
                book_id: createdBook._id,                
                data: createdBook
            }
          
            await cache.setCache(response)
    
            return res.status(201).json(response)
    
        } catch(err) {
    
            return res.status(400).json(err)
    
        }   

    },

    async replaceBook(req, res) {

        const { book_id } = req.params
        const bookData = req.body        

        if (!bookData.bookTitle) {            
            return res.status(400).send({
                message: 'In order to replace a book, you must provide the field bookTitle'
            })
        }        

        if (!bookData.bookAuthor) {           
            return res.status(400).send({
                message: 'In order to replace a book, you must provide the field bookAuthor'
            })
        }

        if (!bookData.bookPublisher) {            
            return res.status(400).send({
                message: 'In order to replace a book, you must provide the field bookPublisher'
            })
        }

        try {

            const existingBook = await database.findBookById(book_id)

            if (!existingBook) return res.status(404).json({
                message: 'Book not found'               
            })      

            const replacedBook = await database.findBookByIdAndUpdate(book_id, bookData) 
            
            const response = {
                book_id: replacedBook._id,                
                data: replacedBook
            }
          
            await cache.setCache(response)

            return res.status(200).json(response)

        } catch(err) {

            return res.status(400).json(err)

        }

    },

    async updateBook(req, res) {

        const { book_id } = req.params
        const bookData = req.body

        try {

            const existingBook = await database.findBookById(book_id)

            if (!existingBook) return res.status(404).json({
                message: 'Book not found'               
            })

            const updatedBook = await database.findBookByIdAndUpdate(book_id, bookData)

            const response = {
                book_id: updatedBook._id,                
                data: updatedBook
            }
          
            await cache.setCache(response)

            return res.status(200).json(response)

        } catch(err) {

            res.status(400).send(err)

        }

    },

    async deleteBook(req, res) {

        const { book_id } = req.params
        
        try {

            const existingBook = await database.findBookById(book_id)

            if (!existingBook) return res.status(404).json({
                message: 'Book not found'               
            })

            const deletedBook = await database.findBookByIdAndRemove(book_id)

            const response = {
                book_id: deletedBook._id,                
                data: deletedBook
            }
          
            await cache.deleteCache(book_id)

            return res.status(200).json(response)

        } catch(err) {

            return res.status(400).send(err)

        }
    }
}

module.exports = BookController