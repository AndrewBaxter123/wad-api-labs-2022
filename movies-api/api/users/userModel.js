import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;


  
  const UserSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: {type: String, required: true },
    favourites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
  });

  UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
  };
  
  UserSchema.methods.comparePassword = function (candidatePassword) {
    const isMatch = this.password === candidatePassword;
    if (!isMatch) {
      throw new Error('Password mismatch');
    }
    return this;
  };

  UserSchema.pre('save', function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt)=> {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash)=> {
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

export default mongoose.model('User', UserSchema);