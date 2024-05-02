import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      url: String,
      publicId: String,
    },
    username: String,
    email: String,
    password: String,
    fullname: String,
    phone: Number,
    detailedAddress: String,
    town: String,
    city: String,
    postcode: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
