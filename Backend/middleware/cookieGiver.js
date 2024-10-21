import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const cookieGiver = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(404).json({ message: "token not exist" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(404).json({ message: "decode doesn't work " });
    }
    const user = await userModel.findById(decode.userId).select("-password");
    if (!user) {
      res.status(401).json({ message: "user not exist" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Middleware Error" });
  }
};

export default cookieGiver;
