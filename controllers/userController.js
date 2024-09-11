import User from "../models/UserModel.js";

export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json({ username: user.username, _id: user._id });
};
