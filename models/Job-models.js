import mongoose from "mongoose";
export const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    detail: { type: String, require: true },
    benefit: { type: String, required: true },
    contact: {
      contactName: { type: String, require: true },
      contactEmail: { type: String, require: true },
      contactAddress: { type: String, require: true },
      contactPhone: { type: String, require: true },
    },
    certification: { type: String, require: true },
    salary: {
      from: { type: Number, require: true },
      to: { type: Number, require: true },
    },
    requirement: { type: String, require: true },
    imgCom: { type: String, require: true },
    workingTime: { type: String, require: true },
    position: { type: String, required: true },
    location: {
      street: { type: String, require: true },
      district: { type: String, require: true },
      city: { type: String, require: true },
    },
    nameCom: { type: String, require: true },
    siteCom: { type: String, require: true },
    thumbnail: { type: String, require: true },
    category: { type: String, require: true },
    isHot: { type: String },
    otherInfo: { type: String, require: true },
    numofRecruit: { type: Number, require: true },
    experience: { type: String, require: true },
    startDay: { type: Date, require: true },
    endDay: { type: Date, require: true },
  },
  {
    timestamps: true, //important
  }
);

const Jobs = mongoose.model("Job", JobSchema);
export default Jobs;
