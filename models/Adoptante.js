const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const AdoptanteSchema = new mongoose.Schema(
  {
    nombre: { type: String},
    email:{ type: String},
    dni: { type: String},
    descripcion: { type: String },
    // email: { type: String, required: true, unique: true, trim: true },
    // password: { type: String, required: true },
    // tipo: { type: String, required: true },
    // date: { type: Date, default: Date.now },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

AdoptanteSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

AdoptanteSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Adoptante = mongoose.model('Adoptante', AdoptanteSchema)

module.exports = Adoptante