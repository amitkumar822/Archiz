import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import createTokensAndSaveCookies from "../jwt/AuthToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    throw new ApiError(400, "All field is required");
  }

  const userVerify = await User.findOne({ email }).lean();

  if (userVerify) {
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

  const user = await User.findOne({ email }).select("+password").lean();
  if (!user) {
    throw new ApiError(404, `User not found with this email ${email}`);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "Somthing went worng!");
  }

  user.password = "";

  // token generate
  const token = await createTokensAndSaveCookies(user._id, res);
  user.refreshToken = token;

  res.json(new ApiResponse(200, user, "User Login successfully"));
});

export const logOut = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  // Remove refresh token from database
  await User.findByIdAndUpdate(
    userId,
    { $set: { refreshToken: "" } },
    { new: true }
  );

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User Logged Out Successfully"));
});
