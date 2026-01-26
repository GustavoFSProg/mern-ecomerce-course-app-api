import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import { imageUploadUtil as any } from "../../helpers/cloudinary";
import { Request, Response } from "express";
import ProductModel from "../../models/Product";
import { imageUploadUtil } from "../../helpers/cloudinary";

const handleImageUpload = async (req: any, res: Response) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req: any, res: Response) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    // res.json({
    //   success: true,
    //   result,
    // });

    // const image = req.files;

    // const {
    //   // image,
    //   title,
    //   description,
    //   category,
    //   brand,
    //   price,
    //   salePrice,
    //   totalStock,
    //   averageReview,
    // } = req.body;

    console.log(result.secure_url);

    const newProduct = await ProductModel.create({
      image: result.secure_url,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
      salePrice: req.body.salePrice,
      totalStock: req.body.totalStock,
      averageReview: req.body.averageReview,
    });

    // await newlyCreatedProduct.save();
    // res.status(201).json({
    //   success: true,
    //   data: newlyCreatedProduct,
    // });

    if (!newProduct) {
      return res.json({ msg: "Não cadastrou o produto!" });
    }

    return res.json({ msg: "SUCESSO!", newProduct });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error occured no controller",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await ProductModel.find({});
    res.status(200).json(
      data
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await ProductModel.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// module.exports = {
//   handleImageUpload,
//   addProduct,
//   fetchAllProducts,
//   editProduct,
//   deleteProduct,
// };

export default {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
