import mongoose from "mongoose";

const ExtraSchema = mongoose.Schema({
  addInfor: {
    type: String,
    default: 'null',
  },
});

const Extra = mongoose.model("Extra", ExtraSchema);
export default Extra;