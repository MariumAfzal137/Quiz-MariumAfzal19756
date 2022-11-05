import Category from "../model/Category";
import Recipe from '../model/recipe'
//import {verifyAccessToken} from "../middleware/check-auth";
//create category,read category,delete category

export const addCategory = async (req, res, next) => {
    const { name } = req.body;
    let newCategory;
    try {
        newCategory = await Category.findOne({ name });
    } catch (err) {
      return console.log(err);
    }
    if (newCategory) {
      return res
        .status(400)
        .json({ message: "Category Already Exists" });
    }
  
    const category = new Category({
      name
    });
    try {
      category.save();
  
    } catch (err) {
      return console.log(err);
    }
    return res.status(201).json({ message: category.name+" category created" });
  };

  //read categories

  export const getAllCategories = async (req, res, next) => {
    let categories;
    try {
      categories = await Category.find();
    } catch (err) {
      console.log(err);
    }
    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }
    return res.status(200).json({ categories });
  };

//delete category

export const deleteCategory = async (req, res, next) => {
  const id = req.params.id;
        try{
          const result=await Category.findByIdAndDelete(id);
          await Recipe.findOneAndDelete({ category:id })
           res.send(result);
        }catch(error){
            res.send(error.message);
        }
};