const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const bodyParser = require("body-parser");
const {expressVaidator, body, validationResult} = require('express-validator')
const validatePassword = require('./utils/validatePassword.js')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });



//Inicializaiones
const app = express()
require('./mongo')
require('./utils/passport')


app.use(cors())

// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))


//view engine
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser('SecretStringForCookies'))
app.use(session({
  secret: "SecretStringForSession",
	cookie: {	maxAge: 60000 },
	resave: true,
	saveUninitialized: true,
  // store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.errores = req.flash("errores");
  // res.locals.registro = req.flash("registro");
  res.locals.user = req.user || null;
  next();
});
///////////////////


// dotenv.config()

// const config = require('./utils/config')

// const apiRouter = require('./routes/backend/apiRouter')
// const adogtameRouter = require('./routes/frontend/adogtameRouter')
const animalsRouter = require('./routes/animals.routes')
const usersRouter = require('./routes/users.routes')
// const mongoose = require('mongoose')
// const { Router } = require('express')








// app.use(middleware.requestLogger)

// app.post('/users', async (req, res) => {
// 	const { password, username } = req.body
// 	if (!password || !username) {
// 		res.sendStatus(400)
// 		return
// 	}

// 	res.send({ userId: 0 })
// })

// routes
// app.use('/api', apiRouter)
// app.use('/', adogtameRouter)3
// app.use('/', indexRouter)
app.get('/', (request, response) => {  
  response.render('pages/index')})

app.use('/animales', animalsRouter)
app.use('/users', usersRouter)
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
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

app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
const PORT = process.env.PORT

const server = app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})
// if (process.env.NODE_ENV !== 'test') {
//   app.listen(PORT, () => {
//	logger.info(`Server running on port ${PORT}`)
//})
// }
module.exports = {app, server}