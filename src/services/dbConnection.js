const mongoose = require('mongoose')

function connectToDatabase(databaseConfig) {
    mongoose.connect(databaseConfig, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, () => console.log('Connected to database'))
}

module.exports = connectToDatabase