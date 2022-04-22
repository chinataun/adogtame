const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const animalesSchema = new Schema(
  {
    nombre: {type:String},
    tipo: {type:String},
    raza: {type:String},
    edad: {type:Number},
    genero: {type:String},
    descripcion: {type:String},
    historial: {type:String},
    image: {type:String},
    protectora: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
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