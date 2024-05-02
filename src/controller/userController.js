import User from "../model/user.js";
import { cloudinary } from "../utils/uploader.js";

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const file = req.file;
    console.log(file);
    const {
      username,
      email,
      password,
      fullname,
      phone,
      detailedAddress,
      town,
      city,
      postcode,
    } = req.body;
    try {
      const user = await User.findById(userId);
      if (file) {
        const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString(
          "base64"
        )}`;
        const fileName = file.originalname.split(".")[0];
        const uploaded = await cloudinary.uploader.upload(dataUrl, {
          _id: fileName,
          _type: "image",
        });
        user.avatar.url = uploaded.secure_url;
        user.avatar.publicId = uploaded.public_id;
      }
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      if (username) {
        user.username = username;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
      if (fullname) {
        user.fullname = fullname;
      }
      if (phone) {
        user.phone = phone;
      }
      if (detailedAddress) {
        user.detailedAddress = detailedAddress;
      }
      if (town) {
        user.town = town;
      }
      if (city) {
        user.city = city;
      }
      if (postcode) {
        user.postcode = postcode;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      await user.deleteOne();
      res.json({ message: "Người dùng đã được xóa" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
