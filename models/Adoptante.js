const mongoose = require('mongoose')

const AdoptanteSchema = new mongoose.Schema(
  {
    nombre: { type: String},
    dni: { type: String},
    telefono: {type: String},
    descripcion: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

AdoptanteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Adoptante = mongoose.model('Adoptante', AdoptanteSchema)

module.exports = Adoptante