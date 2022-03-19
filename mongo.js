const mongoose = require ('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_DEVELOP, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'development'
	? MONGO_DB_URI_DEVELOP
	: MONGO_DB_URI  
	console.log(NODE_ENV)

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
.then(() => {
	console.log('conexion establecida a la base de datos')
})
.catch(err => {
	console.log(err)
})



