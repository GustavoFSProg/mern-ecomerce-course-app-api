import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Creates a new blog post and inserts it into database
async function CreateUser(req: Request, res: Response) {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    return res.json({ msg: "Success!", user });
  } catch (error) {
    return res.json({ msg: "ERROR!", error });
  }
}

async function FindUsers(req: Request, res: Response) {
  try {
    const user = await User.find();

    return res.json({ user });
  } catch (error) {
    return res.json({ msg: "ERROR!", error });
  }
}

async function Login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" },
    );

    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
      token,
    });
  } catch (error) {
    // return res.json({ msg: "LOGADO!!", user });
    return res.json({ msg: "ERROR!", error });
  }
}

export default { CreateUser, FindUsers, Login };
