const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');


// Using _id
const productSubSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Change to ObjectId
  productName: {type:String,require:true},
  quantity: { type: Number, default: 1 },
  size:{type:String,require:true},
  image: {type:String,require:true},
  price: {
    type: Number
  }
}, { _id: false });


const cartSchema = new mongoose.Schema({
  products: { type: [productSubSchema], default: [] }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    city: {
      type: String
    },
    province: {
        type: String
    },
    zip: {
      type: String
    },
    country: {
      type: String
    },
    phone: {
        type: String,
        required: true
    },
    new_user_discount:{
        type:Boolean,
        default:false
    },
    register_data_time: {
        type: Date,
        default: Date.now
    },
  //  cart: cartSchema
  cart: { type: cartSchema, default: () => ({ products: [] }) },
},{versionKey:false});

UserSchema.pre("save", function (next) {
    const user = this;
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError);
            }
  
            user.password = hash
            next();
          });
        }
      });
    } else {
      return next();
    }
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;