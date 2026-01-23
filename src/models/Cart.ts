// const mongoose = require("mongoose");
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [],
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
