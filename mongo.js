const mongoose = require ('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_DEVELOP, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'development'
	? MONGO_DB_URI_DEVELOP
	: MONGO_DB_URI  
	console.log(NODE_ENV)

console.log(connectionString)
// `mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame?retryWrites=true&w=majority`
// if (process.env.NODE_ENV === 'develop') 
// 	connectionString = `mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame-staging?retryWrites=true&w=majority`

// const connectionString = process.env.MONGO_DB_URI
//conexion a mongodb
mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => {
		console.log('conexion establecida a la base de datos')
	}).catch(err => {
		console.log(err)
	})


// process.on('uncaughtException', () => {
//     mongoose.connection.close()
// })


