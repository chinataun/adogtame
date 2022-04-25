const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProtectoraSchema = new Schema(
  {
    nombre: { type: String},
    cif: { type: String},
    telefono: { type: String},
    ciudad: {type: String},
    descripcion: { type: String },
    image: { type: String },
    animales: {
      type: [Schema.Types.ObjectId], 
      ref: 'Animal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProtectoraSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Protectora = mongoose.model('Protectora', ProtectoraSchema)

module.exports = Protectora