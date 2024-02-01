const express = require('express')
const morgan = require("morgan")
const connectDb = require('./db/connect')
const auth = require('./middlewares/auth-middleware')
require('dotenv').config()

// Error Hanlers
const notFOund = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')

// Routers
const jobROutes = require('./routes/job-routes')
const authRoutes = require('./routes/auth-routes')

// security layers
const helmet = require('helmet')
const cors = require('cors')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssClean())
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

const start = async () => {
    try {
        await connectDb('mongodb://localhost:27017/jobs')
        app.listen(process.env.PORT, () => console.log("App listening on port 4000"))
    } catch (error) {
        console.log('error connectiong', error.message)
    }
}

start()

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', auth, jobROutes)


app.use(notFOund)   
app.use(errorHandler)


