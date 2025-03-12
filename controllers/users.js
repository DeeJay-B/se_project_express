const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");
const {
  BAD_REQUEST,
  SERVER_ERROR,
  SUCCESS,
  NOT_FOUND,
  CREATED,
} = require("../utils/config");

// Get / users;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

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
        return res
          .status(BAD_REQUEST)
          .send({ message: "Email already exists" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error with Server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Cast Error" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Document Not Found" });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  User.findOne({
    email,
  })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid email or password" });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) {
          return res
            .status(BAD_REQUEST)
            .send({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(SUCCESS).send({ user, token });
      });
    });
};

module.exports = { getUsers, createUser, getUser, login };
