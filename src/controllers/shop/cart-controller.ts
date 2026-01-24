import { Request, Response } from "express";
import Cart from "../../models/Cart";

async function addToCart(req: Request, res: Response) {
  try {
    console.log(req.body.items);

    const Carrinho = await Cart.create({
      userId: req.body.userId,
      items: req.body.items,
    });

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

async function fetchCartItems(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "*",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // const validItems = cart.items.filter(
    // (productItem) => productItem.productId,
    //  );

    // if (validItems.length < cart.items.length) {
    //    cart.items = validItems;
    //   await cart.save();
    // }

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      //cart: populateCartItems,
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}

async function getCartProducts(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart: any = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "*",
    });

    for (let i = 0; i < cart.items.length; i++) {
      console.log("Produto ", i + 1, ": ", cart.items[i].productId);
      // return res.json(cart.items[i].productId);
    }

    return res.status(200).json({
      success: true,

      //  produto1: cart.items[0].productId,
      //  produto2: cart.items[1].productId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error",
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
  fetchCartItems,
  getCartProducts,
};
