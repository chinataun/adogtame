const express = require('express')
const expressLayouts = require('express-ejs-layouts')
// const passport = require('passport')
const path = require('path')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const bodyParser = require("body-parser");
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const animalsRouter = require('./routes/animals.routes')
const usersRouter = require('./routes/users.routes')
const dotenv = require('dotenv')
// var exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {cookieJwtAuth, authenticateToken} = require('./utils/cookieJwtAuth')
const { Console } = require('console')
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
app.use('/uploads', express.static(__dirname + 'public/uploads'))
app.use('/js', express.static(__dirname + 'public/js'))

app.use(methodOverride('_method'))

//view engine
app.set('views', path.join(__dirname, 'views'))
// app.use(expressLayouts)
// app.set('layout', './layouts/full-width')
// app.set('view engine', 'ejs')
app.engine(
  ".hbs",
  expressHandlebars.engine({
    defaultLayout: "full-width",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set("view engine", ".hbs");



// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser('SECRET'))
app.use(session({
  secret: "SECRET",
	cookie: {	maxAge: 600000 },
	resave: true,
	saveUninitialized: true,
  // store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));
// app.use(passport.initialize());
// app.use(passport.session());
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

//Routes


app.get('/',cookieJwtAuth, (request, response) => {  
  response.render('index')
})
app.use('/animales',cookieJwtAuth, animalsRouter)
app.use('/users',cookieJwtAuth, usersRouter)

// app.use(middleware.requestLogger)

app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
const PORT = process.env.PORT

const server = app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})

module.exports = {app, server}