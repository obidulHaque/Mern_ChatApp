import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import genareteToken from "../utils/genareteToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confromPassword, gender } =
      await req.body;

    if (password !== confromPassword) {
      return res.status(400).json({ message: "Password don't match" });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "username alredy taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new userModel({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    // genareteToken(newUser._id, res);
    await newUser.save();
    return res.status(200).json({ message: "sign up successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "sign up Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = await req.body;
    const user = await userModel.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "username or password Invalid" });
    }
    genareteToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "login Fail" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "logout Fail" });
  }
};
