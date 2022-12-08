const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

// @desc Sign user in
// @route POST /api/user/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user.id,
      name: user.firstName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

// @desc Sign up new user
// @route POST /api/user/
// @access Public
const registerUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("Email in use already");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      firstName: user.firstName,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// const getUserInfo
// To be added in the future

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = { loginUser, registerUser };
