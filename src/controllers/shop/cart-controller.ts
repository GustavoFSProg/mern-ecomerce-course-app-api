import { Request, Response } from "express";

// const Cart = require("../../models/Cart");
import Cart from "../../models/Cart";
// const ProductModel = require("../../models/Product");
import ProductModel from "../../models/Product";
import { debug } from "console";

// async function addToCart(req: Request, res: Response) {
//   try {
//     const { userId, productId, quantity } = req.body;

//     if (!userId || !productId || quantity <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data provided!",
//       });
//     }

//     const product = await ProductModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const findCurrentProductIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId,
//     );

//     if (findCurrentProductIndex === -1) {
//       cart.items.push({ productId, quantity });
//     } else {
//       cart.items[findCurrentProductIndex].quantity += quantity;
//     }

//     await cart.save();
//     return res.status(200).json({
//       success: true,
//       data: cart,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// }

async function addToCart(req: Request, res: Response) {
  try {
    // const { userId, items } = req.body;

    // if (!userId || !items) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid data provided!",
    //   });
    // }

    // const product = await ProductModel.findById(productId);

    // if (!product) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Product not found",
    //   });
    // }

    console.log(req.body.items);

    // async function newProduct() {
    const Carrinho = await Cart.create({
      userId: req.body.userId,
      items: req.body.items,
    });
    // }
    // let cart = await Cart.findOne({ userId });

    // if (!cart) {
    //   cart = new Cart({ userId, items: [] });
    // }

    // const findCurrentProductIndex = cart.items.findIndex(
    //   (item) => item.productId.toString() === productId,
    // );

    // if (findCurrentProductIndex === -1) {
    //   cart.items.push({ productId, quantity });
    // } else {
    //   cart.items[findCurrentProductIndex].quantity += quantity;
    // }

    // await cart.save();
    return res.status(200).json({
      success: true,
      data: Carrinho,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

// async function deleteCartItem(req: Request, res: Response) {
//   try {
//     const { userId, productId } = req.params;
//     if (!userId || !productId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data provided!",
//       });
//     }

//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found!",
//       });
//     }

//     cart.items.pull({ productId });

//     await cart.save();

//     await cart.populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     const populateCartItems = cart.items.map((item) => ({
//       productId: item.productId ? item.productId._id : null,
//       image: item.productId ? item.productId.image : null,
//       title: item.productId ? item.productId.title : "Product not found",
//       price: item.productId ? item.productId.price : null,
//       salePrice: item.productId ? item.productId.salePrice : null,
//       quantity: item.quantity,
//     }));

//     res.status(200).json({
//       success: true,
//       data: {
//         ...cart.toObject(),
//         items: populateCartItems,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }

export default {
  addToCart,
};
