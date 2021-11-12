const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  DOB: {
    type: String,
    required: [true, "Date of birth is required"]
  },
    city: {
      type: String,
      required: [true, "City is required"]
    },
    streetAddress: {
      type: String,
      required: [true, "Street Address is required"]
    },
    State: {
      type: String,
      required: [true, "State is required"]
    },
    zip:{
      type: String,
      required: [true, "Zip Code is required"]
    },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
  Role: {
    type: String,
    enum:["admin","users"],
    required: [true, "Role is required"],
    default:"users"
  },
  LibraryCard:
  {
    type:String
  }
}, {timestamps: true});
UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    console.log(this.password)
    console.log(this.confirmPassword)
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});





module.exports = mongoose.model('UserManager', UserSchema);