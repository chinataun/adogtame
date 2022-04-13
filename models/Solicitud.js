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
      ref: 'Adoptante',
    },
    mensaje: { type: String },
    protectora: {
      type: Schema.Types.ObjectId, 
      ref: 'Protectora',
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