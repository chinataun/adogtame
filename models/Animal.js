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
    historial: String,
    image: {type:String},
    protectora: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
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