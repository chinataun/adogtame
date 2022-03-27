const mongoose = require ('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_DEVELOP, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'development'
	? 'mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame-staging?retryWrites=true&w=majority'
	: 'mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame?retryWrites=true&w=majority'
  
const conection = mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
.then(() => {
	console.log('conexion establecida a la base de datos')
})
.catch(err => {
	console.log(err)
})

module.exports = conection


