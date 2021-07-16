import mongoose from "mongoose";
export const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "employer", "admin"] },
  cvs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cv" }],
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  favorite: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
