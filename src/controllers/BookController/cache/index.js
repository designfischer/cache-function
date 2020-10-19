const asyncRedis = require('async-redis')

const client = asyncRedis.createClient({
    host: process.env.REDIS_HOST || process.env.LOCAL_REDIS_HOST,
    port: process.env.REDIS_PORT || process.env.LOCAL_REDIS_PORT
})

const expirationTime = 60

const cache = {
   
    async setCache(response) {
        
        const bookId = response.book_id

        const cacheData = JSON.stringify(response)

        await client.setex(bookId, expirationTime, cacheData)        

    },   

    async getCache(book_id) {

        if (book_id) {

            const cachedData = await client.get(book_id)

            return JSON.parse(cachedData)

        } else {

            return null
            
        } 

    },

    async deleteCache(book_id) {

        await client.del(book_id)

    }

}

module.exports = cache