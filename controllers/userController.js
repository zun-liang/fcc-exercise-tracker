import User from "../models/UserModel.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ username: user.username, _id: user._id });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
