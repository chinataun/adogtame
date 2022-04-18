const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SolicitudSchema = new Schema(
  {
    animal: {
      type: Schema.Types.ObjectId, 
      ref: 'Animal',
    },
    adoptante: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
    },
    mensajeAdoptante: { type: String },
    mensajeProtectora: { type: String },
    protectora: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
    },
    estado: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Solicitud = mongoose.model('Solicitud', SolicitudSchema)

module.exports = Solicitud