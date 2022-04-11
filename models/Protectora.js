const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const ProtectoraSchema = new Schema(
  {
    nombre: { type: String},
    cif: { type: String},
    telefono: { type: String},
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

// ProtectoraSchema.methods.encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// ProtectoraSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const Protectora = mongoose.model('Protectora', ProtectoraSchema)

module.exports = Protectora