const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

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

const Adoptante = mongoose.model('Adoptante', AdoptanteSchema)

module.exports = Adoptante