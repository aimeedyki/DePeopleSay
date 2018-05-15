import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';


const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/* eslint-disable func-names */
UserSchema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// UserSchema.methods.comparePassword = (password, cb) => {
//   bcrypt.compare(password, this.password, (error, isMatch) => {
//     if (error) {
//       return cb(error);
//     }
//     cb(null, isMatch);
//   });
// };

UserSchema.methods.isPasswordValid = (password) => {
  const user = this;
  return bcrypt.compareSync(password, this.local.password);
};

// Omit the password when returning a user
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
});
const User = mongoose.model('User', UserSchema);

export default User;
