import mongoose from "mongoose";


const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});
export default mongoose.model("Books", BooksSchema);