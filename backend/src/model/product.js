const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
      type: Number,
      required: true,
  },
  description: {
      type: String,
      required: true
  },
  offer: {
      type: Number,
  },
  productPictures: [
      {img: {type: String}}
  ],
  reviews: [
      {
          userId: {type :mongoose.Schema.Types.ObjectId, ref: 'User'}
      }
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category'
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  },
  updateAt: Date
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
