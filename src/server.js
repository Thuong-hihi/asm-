import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import movieRouter from './routers/movies'
import genresRouter from './routers/genres'
import castsRouter from './routers/cast'
import uploadRouter from './routers/upload'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express()
const port = 8080

// app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Static
app.use(express.static('public'))

// Routing
app.get('/', function (req, res) {
    res.send("hêlohêlo")
})

// Router
app.use("/movies", movieRouter)
app.use("/cast",castsRouter)
app.use("/genres",genresRouter)
app.use("/upload", uploadRouter)

app.listen(port, function () {
    console.log(`Server is running on ${port}`);
})