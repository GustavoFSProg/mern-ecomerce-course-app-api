// import { Request, Response } from "express";
// import { PrismaClient } from "../generated/prisma/client";
// import md5 from "md5";
// import { generateToken } from "../Token";

// const prismaDB = new PrismaClient();

// async function createUser(req: Request, res: Response) {
//   try {
//     const user = await prismaDB.users.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         password: String(
//           md5(
//             req.body.password,
//             process.env.SECRET as string & { asBytes: true }
//           )
//         ),
//       },
//     });

//     return res.status(201).json({ message: "Success!", user });
//   } catch (error) {
//     return res.status(201).json({ message: "error!", error });
//   }
// }

// async function updateUser(req: Request, res: Response) {
//   try {
//     const user = await prismaDB.users.update({
//       where: { id: req.params.id },
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         password: String(
//           md5(
//             req.body.password,
//             process.env.SECRET as string & { asBytes: true }
//           )
//         ),
//       },
//     });

//     return res.status(201).json({ message: "Success!", user });
//   } catch (error) {
//     return res.status(201).json({ message: "error!", error });
//   }
// }

// async function deleteUser(req: Request, res: Response) {
//   try {
//     const data = await prismaDB.users.delete({
//       where: { id: req.params.id },
//     });

//     return res.status(201).json({ message: "Deletado!!!" });
//   } catch (error) {
//     return res.status(201).json({ message: "error!", error });
//   }
// }

// async function getUsers(req: Request, res: Response) {
//   try {
//     const data = await prismaDB.users.findMany({
//       select: {
//         name: true,
//         email: true,
//         password: false,
//       },
//     });

//     return res.status(201).json(data);
//   } catch (error) {
//     return res.status(201).json({ message: "error!", error });
//   }
// }

// async function Login(req: Request, res: Response) {
//   try {
//     const dados = { email: req.body.email, password: req.body.password };

//     const data = await prismaDB.users.findFirst({
//       where: {
//         email: req.body.email,
//         password: String(
//           md5(
//             req.body.password,
//             process.env.SECRET as string & { asBytes: true }
//           )
//         ),
//       },
//     });

//     if (!data) {
//       return res.status(400).json({ message: "erro no Login!" });
//     }

//     const token = await generateToken(data);

//     return res.status(201).json({ msg: "User created well!!", data, token });
//   } catch (error) {
//     return res.status(201).json({ message: "error!", error });
//   }
// }

// export default { getUsers, createUser, deleteUser, updateUser, Login };
