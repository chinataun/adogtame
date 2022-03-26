const mongoose = require('mongoose')

const animalesSchema = new mongoose.Schema(
  {
    nombre: String,
  tipo: String,
    raza: String,
  edad: Number,
  genero: String,
  descripcion: String
  },
  {
    timestamps: true
  }
)

animalesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Animal = mongoose.model('Animal', animalesSchema)

module.exports = Animal