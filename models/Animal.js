const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const animalesSchema = new Schema(
  {
    nombre: String,
    tipo: String,
    raza: String,
    edad: Number,
    genero: String,
    descripcion: String,
    image: String,
    protectora: {
      type: Schema.Types.ObjectId, 
      ref: 'Protectora',
    },
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