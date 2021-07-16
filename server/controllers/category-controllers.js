import CategoryData from "../models/Category-models.js";

//GET CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const allCategories = await CategoryData.find();

    //res.status: https://restapitutorial.com/httpstatuscodes.html
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//CREATE CATEGORIES
export const createCategories = async (req, res) => {
  try {
    const {
      career: { careerName, icon, total },
    } = req.body;
    const newCategory = new CategoryData({
      career: { careerName, icon, total },
    });

    await newCategory.save();
    res.json({ msg: "Created a category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//DELETE CATEGORIES
export const deleteCategories = async (req, res) => {
  try {
    await CategoryData.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a Category" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};

//UPDATE CATEGORIES
export const updateCategories = async (req, res) => {
  try {
    const {
      career: { careerName, icon, total },
    } = req.body;

    await CategoryData.findOneAndUpdate(
      { _id: req.params.id },
      {
        career: { careerName, icon, total },
      }
    );

    res.json({ msg: "Updated a Category" });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
