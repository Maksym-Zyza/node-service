const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./models/User");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const user = require("./models/User");
const config = require("config");

//  /api/auth/register
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      // user seve
      const { email, password } = req.body;

      // проверка на email; findOne - поиск одного email
      const candidete = await User.findOne({ email });
      if (candidete) {
        return res.status(400).json({ message: "User already exists" });
      }

      // bcrypt - хешируем пароль
      const hashedPassword = bcrypt.hash(password);
      const user = new User({ email, password: hashedPassword });
      await user.seve();

      res.status(200).json({ message: "User created successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

//  /api/auth/login
router.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Incorrect password").exists(),
  ],
  async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // проверка на совпадение
      const isMatch = await dcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }

    // возвращаем токен
    const token = jwt.sign({ userID: user.id }, config.get("jwtSecret"), {
      expiresIn: "2h",
    });

    res.json({ token, userID: user.id });
  }
);

module.exports = router;
