const mongoose = require('mongoose')

const datosSchema = new mongoose.Schema({
	'nombre': String,
	tipo: String,
	rango: String
})
datosSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
const Dato = mongoose.model('Dato', datosSchema)

module.exports = Dato

// User.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })


// const user = new User({
//     user: 'jesus',
//     password: 'passwordjesus',
//     type: 'adoptante'
// })

// user.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })