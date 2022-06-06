const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    addressId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserAddress.Address",
    },
 
    totalAmount: {
      type: Number,
      required: true,
    },

    items: [
        { 
            productId: { 
                type: mongoose.Schema.ObjectId,
                ref: 'Product'
             },
            payablePrice: {
                type: Number,
                required: true
            } ,
            purchasedQuantity: {
                type: Number,
                required: true
            } 
        
        }
    ],
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "cancelled", "completed", "refund"]
    },

     paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
