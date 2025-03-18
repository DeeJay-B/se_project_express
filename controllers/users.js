const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");
const {
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
  NOT_FOUND,
  CREATED,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(CREATED).send({ user, token }); // Send both user and token
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Validation Error" });
      }
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error with Server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findOne({
    email,
  })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Invalid email or password" });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) {
          return res
            .status(UNAUTHORIZED)
            .send({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(SUCCESS).send({ user, token });
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({ message: "Server error" });
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Validation Error" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error from update" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      res.status(SUCCESS).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from getCurrent" });
    });
};
module.exports = { createUser, updateCurrentUser, login, getCurrentUser };
