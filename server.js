import dotenv from 'dotenv'
import axios from 'axios'
import express from 'express'
import cors from 'cors'
const app = express()

dotenv.config()

import bodyParser from 'body-parser'
const {json} = bodyParser

const PORT = process.env.PORT || 3000
const reqUrl = process.env.URL
const originsAllowed = [process.env.CLIENT_URL || 'CLIENT_URL=http://localhost:5173']

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: originsAllowed,
    methods: ['POST']
}))

if (!reqUrl) {
    console.log('Missing URL from the server')
    process.exit(1)
}

app.post('/submit', async (req, res) => {
    try {
        await axios.post(reqUrl, req.body)
        res.send('Success')
    } catch (error) {
        res.status(500).send(`Error at server: ${error.message}`)
        console.error('Error at server: ', error.message)
    }
})

app.listen(PORT, () => {
    console.log(`YOUR APP IS UP AND READY TO USE ON: http://localhost:${PORT}`)
})
