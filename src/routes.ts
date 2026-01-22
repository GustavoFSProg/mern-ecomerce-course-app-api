import express, { Router } from "express";
import { Request, Response } from "express";
import { multerConfig } from "./config/uploader";
import productsController from "./controllers/userController";
import userController from "./controllers/userController";
import productController from "./controllers/admin/productController";
import { upload } from "./helpers/cloudinary";
// import { upload } from "../src/helpers/cloudinary";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Api Running" });
});

// products

routes.post(
  "/add-product",
  upload.single("image"),
  productController.addProduct,
);
// routes.post("/create-product", multerConfig, productsController.createProduct);
// routes.get("/get-products", productsController.getProducts);
// routes.get("/get-one-product/:id", productsController.getOneProduct);

// users
routes.post("/create-user", userController.CreateUser);
routes.post("/login", userController.Login);
routes.get(
  "/get-users",
  userController.authMiddleware,
  userController.FindUsers,
);
routes.post("/logout", userController.logoutUser);
// routes.put("/update-user/:id", userController.updateUser);
// routes.delete("/delete-user/:id", userController.deleteUser);

export default routes;

// [
//   {
//     "id": "a1c41967-3525-4041-9f0a-c9cdd5abbe90",
//     "name": "Augusto",
//     "email": "augusto@gmail.com",
//     "password": "a29a66ff03d7959ee66ea2118afdea32",
//     "createdAt": "2025-09-23T21:10:18.837Z"
//   },
//   {
//     "id": "7c0c9620-1339-463a-aa4e-745357146d69",
//     "name": "Marcelo",
//     "email": "marcelo@gmail.com",
//     "password": "0433e3038e208089eb74b7d9c8f5725f",
//     "createdAt": "2025-09-23T21:12:15.418Z"
//   },
//   {
//     "id": "9406703c-5299-422a-af51-8152f147844c",
//     "name": "Patricia CAGADA",
//     "email": "patriciaCAGADA@gmail.com",
//     "password": "CUZAO",
//     "createdAt": "2025-09-23T21:21:09.987Z"
//   }
// ]
