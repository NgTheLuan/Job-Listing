import mongoose from "mongoose";
export const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    career: {
      careerName: { type: String, required: true },
      icon: { type: String, required: true },
      total: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Category", CategorySchema);
export default Categories;
