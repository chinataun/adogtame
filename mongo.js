require('dotenv').config({ path: './.env' });
const mongoose = require ('mongoose')

// const connectionString = `mongodb+srv://adogtame:adogtameDB@clusteradogtame.zonvg.mongodb.net/adogtame?retryWrites=true&w=majority`
const connectionString = process.env.MONGO_DB_URI.toString()
//conexion a mongodb
mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})
	.then(() => {
		console.log('conexion establecida')
	}).catch(err => {
		console.log(err)
	})


// process.on('uncaughtException', () => {
//     mongoose.connection.close()
// })


