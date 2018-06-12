import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';


const UserSchema = new Schema({
  local: {
    email: {
      type: String,
      unique: true,
      required: true,
      sparse: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      sparse: true
    },
    password: {
      type: String,
      required: true
    }
  },
  facebook: {
    id: {
      type: String,
      unique: true,
      sparse: true
    },
    token: String,
    name: String,
    email: String
  },
  twitter: {
    id: {
      type: String,
      unique: true,
      sparse: true
    },
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: {
      type: String,
      unique: true,
      sparse: true
    },
    token: String,
    email: String,
    name: String
  }
});

/* eslint-disable func-names */
UserSchema.pre('save', function (next) {
  const user = this;

  if (user.local.isModified('password') || user.local.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.local.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.local.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.isPasswordValid = function (password) {
  const user = this;
  return bcrypt.compareSync(password, this.local.password);
};

// Omit the password when returning a user
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.local.password;
    return ret;
  }
});
const User = mongoose.model('User', UserSchema);

export default User;
