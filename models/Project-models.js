import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
  project: {
    type: String,
    default: 'null',
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;