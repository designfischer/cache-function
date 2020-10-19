const express = require('express')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')
const connectToDatabase = require('./services/dbConnection')

const APP_PORT = process.env.PORT || process.env.LOCAL_APP_PORT

const app = express()

connectToDatabase(process.env.DB_URI)

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(APP_PORT, () => console.log(`Server running on port ${APP_PORT}`))