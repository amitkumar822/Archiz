import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import createTokensAndSaveCookies from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    throw new ApiError(400, "All field is required");
  }

  const userVerify = await User.find({email}).lean();

  if (!userVerify) {
    throw new ApiError(409, `User allredy exist with same email ${email}`);
  }

  const isHashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: isHashPassword,
    mobile,
  });

  res.json(new ApiResponse(201, user, "User is successfully created"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All field is required");
  }

  const user = await User.find({email}).select("+password");
  if (!user) {
    throw new ApiError(400, "Somthing went worng!");
  }

  user.password = "";

  // token generate
  const token = await createTokensAndSaveCookies(user._id, res);
  res.json(new ApiResponse(200, { user, token }, "User Login successfully"));
});
