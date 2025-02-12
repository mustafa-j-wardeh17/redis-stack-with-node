import 'dotenv/config'

import express from 'express'

import { personRouter } from './routers/person-router.js'

/* create an express app and use JSON */
const app = new express()
app.use(express.json())

// bring in some routes
app.use('/person', personRouter)

app.use('/search', personRouter)


/* start the server */
app.listen(8080)
