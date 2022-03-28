const mongoose = require ('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_DEVELOP, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'development'
	? 'mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame-staging?retryWrites=true&w=majority'
	: 'mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame?retryWrites=true&w=majority'
  
let conection;
if (NODE_ENV === 'development') {
	conection = mongoose.connect('mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame-staging?retryWrites=true&w=majority', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}).then(() => {
		console.log('conexion establecida a la base de datos')
	})
	.catch(err => {
		console.log(err)
	})
} else {
	conection = mongoose.connect('mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame?retryWrites=true&w=majority', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}).then(() => {
		console.log('conexion establecida a la base de datos')
	})
	.catch(err => {
		console.log(err)
	})
}



process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})

module.exports = conection


