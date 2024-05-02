import User from "../model/user.js";
import bcrypt from "bcrypt";
const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ username });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      if (user) {
        return res.status(400).json({ error: "Người dùng đã tồn tại" });
      }
      const newUser = await new User({
        username,
        email,
        password: hashed,
      });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (!user) {
        res.status(404).json("username hoặc email không hợp lệ!");
        return;
      }
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        res.status(404).json("password không hợp lệ!");
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
export default authController;
