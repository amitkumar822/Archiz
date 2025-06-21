import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      minLength: [10, "Mobile number must be at least 10 digits"],
      maxLength: [13, "Mobile number must be at most 13 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      select: false,
      minLength: [4, "Password Must Contain At Least 4 Characters!"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
