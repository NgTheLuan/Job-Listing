import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
  firstname: {
    type: String,
    default: "null"
  },
  lastname: {
    type: String,
    default: "null"
  },
  dob: {
    type: String,
    default: "null"
  },
  email: {
    type: String,
    default: "null"
  },
  address: {
    type: String,
    default: "null"
  },
  phone: {
    type: String,
    default: "null"
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;