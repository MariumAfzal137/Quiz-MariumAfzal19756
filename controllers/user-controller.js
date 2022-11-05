import Books from "../model/User";
//import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";
//import {signAccessToken,signAdminAccessToken} from "../middleware/check-auth";


export const getAllBooks = async (req, res, next) => {
  let bookslist;
  try {
    bookslist = await Books.find();
  } catch (err) {
    console.log(err);
  }
  if (!bookslist) {
    return res.status(404).json({ message: "No Books Found" });
  }
  return res.status(200).json({ bookslist }
    );
};

export const findBook = async (req, res, next) => {
  const { name } = req.body;
  let existingBook;
  try {
    existingBook = await Books.findOne({ name });
  } catch (err) {
    return console.log(err);
  }
  if (!existingBook) {
    return res.status(404).json({ message: "Couldnt Find Book" });
  }

  return res
    .status(200)
    .json({ existingBook });
};


// getAllbooks: async(req,res)=>{
//   Book.find({})
//   .exec((error,books)=> {
//     if(error) return res.status(400).json({error});
//     if(books){
//       res.status(200).json({books});
//     }

// export const signup = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (err) {
//     return console.log(err);
//   }
//   if (existingUser) {
//     return res
//       .status(400)
//       .json({ message: "User Already Exists! Login Instead" });
//   }

//   const hashedPassword = bcrypt.hashSync(password);

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//     blogs: [],
//   });
//   try {
//     user.save();

//   } catch (err) {
//     return console.log(err);
//   }
//   return res.status(201).json({ message: "Successful signup" });
// };

// export const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!existingUser) {
//     return res.status(404).json({ message: "Couldnt Find User By This Email" });
//   }

//   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Incorrect Password" });
//   }
//   let accessToken
//   if(existingUser.role==="admin"){
//     accessToken = await signAdminAccessToken(existingUser.id)
//   }
//   else{
//     accessToken = await signAccessToken(existingUser.id)
//   }
  

//   return res
//     .status(200)
//     .json({ message: "Login Successfull", accessToken: accessToken });
// };

// export const getProfile= async (req, res, next) => {

//   let user;
//   try {
//     user = await User.findById(req.payload.aud);
//   } catch (err) {
//     console.log(err);
//   }
//   if (!user) {
//     return res.status(404).json({ message: "No Users Found" });
//   }
//   return res.status(200).json({ user });

// };