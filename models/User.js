const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    // nombre: String,
    // email: String,
    // role: String,
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    references: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'role'
    },
    role: {
      type: String, 
      enum: ['Adoptante', 'Protectora'],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema)

module.exports = User