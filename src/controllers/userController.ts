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
    // const token = req.cookies.tokencookie;

    // console.log(token);

    // // console.log(token);
    // if (!token)
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorised user!",
    //   });
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

    // app.get('/definir-cookie', (req, res) => {
    //     // 2 dias em milissegundos
    //     const doisDiasEmMs = 2 * 24 * 60 * 60 * 1000;

    //     res.cookie('meuCookie', 'valorSecret', {
    //         maxAge: doisDiasEmMs, // Define a duração
    //         httpOnly: true,       // Boa prática: seguro contra XSS
    //         secure: true,         // Opcional: apenas HTTPS (recomendado para produção)
    //         sameSite: 'lax'       // Opcional: proteção CSRF
    //     });

    //     res.send('Cookie definido para durar 2 dias!');
    // });
    // return  res.cookie('meuCookie', 'valorDoCookie', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    return (
      res
        .cookie("tokencookie", token, {
          // maxAge: 3 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          // secure: false,
        })

        // { httpOnly: true, secure: false })
        .json({
          success: true,
          message: "Logged in successfully",
          user: {
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id,
            userName: checkUser.userName,
          },
          token,
        })
    );
  } catch (error) {
    // return res.json({ msg: "LOGADO!!", user });
    return res.json({ msg: "ERROR!", error });
  }
}

function logoutUser(req: Request, res: Response) {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
}

function authMiddleware(req: Request, res: Response, next: any) {
  const token = req.cookies.tokencookie;

  // console.log(token);
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    // const { user } = decoded;
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
}

export default { CreateUser, FindUsers, Login, logoutUser, authMiddleware };
