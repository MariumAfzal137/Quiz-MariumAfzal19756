import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user-routes";
import categoryRouter from "./routes/category-routes";
import recipeRouter from "./routes/recipe-routes";

const app = express();
app.use(express.json());
app.use("/user", userRouter);
// app.use("/category", categoryRouter);
// app.use("/recipe", recipeRouter);




mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.7ensi4f.mongodb.net/books?retryWrites=true&w=majority"
    ).then(()=>app.listen(5000)).then(()=>console.log("Connected to db and listening to 5000")
    ).catch((err)=>console.log(err));





