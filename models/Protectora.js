const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const ProtectoraSchema = new mongoose.Schema(
  {
    nombre: { type: String},
    email:{ type: String},
    tipo: { type: String},
    cif: { type: String},
    telefono: { type: String},
    descripcion: { type: String },
    password: { type: String, required: true },
    // email: { type: String, required: true, unique: true, trim: true },
    // password: { type: String, required: true },
    // tipo: { type: String, required: true },
    // date: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    image: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProtectoraSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

ProtectoraSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Protectora = mongoose.model('Protectora', ProtectoraSchema)

module.exports = Protectora