const express = require('express')
const morgan = require("morgan")
const connectDb = require('./db/connect')
require('dotenv').config()
const notFOund = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')
const jobROutes = require('./routes/job-routes')
const authRoutes = require('./routes/auth-routes')
const auth = require('./middlewares/auth-middleware')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

const start = async () => {
    try {
        await connectDb('mongodb://localhost:27017/jobs')
        app.listen(process.env.PORT, () => console.log("App listening on port 4000"))
    } catch (error) {
        console.log('error connectiong', error.message)
    }
}

start()

app.use('/api/v1/jobs/auth', authRoutes)
app.use('/api/v1/jobs', auth, jobROutes)


app.use(notFOund)   
app.use(errorHandler)


