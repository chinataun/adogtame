const dotenv = require('dotenv')

dotenv.config()
require('./mongo')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/apiRouter')
const adogtameRouter = require('./router/adogtameRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const { Router } = require('express')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))


//view engine
app.set('views', './views/pages')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(middleware.requestLogger)

// routes
app.use('/api', usersRouter)
app.use('', adogtameRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
// const mysql = require('mysql')
// const path = require("path");
// const bodyParser = require("body-parser");
// const statics = path.join(__dirname,"public");
// app.use(bodyParser.urlencoded({ extended: false }));
// const port = process.env.PORT || 3000

//conection
// const pool = mysql.createPool({
//     host: 'eu-cdbr-west-02.cleardb.net',
//     user: 'b45a5769a8153a',
//     password: 'd0b9d566',
//     database: 'heroku_a6c1a29456a7b8b'
// })

// app.use(express.static(statics));
// app.use('/api/users', Router)









// app.listen(port)
// console.log(`Server is listening on ${port}`);


// const config = require('./utils/config')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const notesRouter = require('./controllers/notes')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
// const mongoose = require('mongoose')

// logger.info('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error) => {
//     logger.error('error connecting to MongoDB:', error.message)
//   })

// app.use(cors())
// app.use(express.static('build'))
// app.use(express.json())
// app.use(middleware.requestLogger)

// app.use('/api/notes', notesRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app