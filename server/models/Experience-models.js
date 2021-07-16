import mongoose from "mongoose";

const ExperienceSchema = mongoose.Schema({
  expDescription: {
    type: String,
    default: 'null',
  },
});

const Experience = mongoose.model("Experience", ExperienceSchema);
export default Experience;