var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const fakeUsers = [
  {
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    username: "user",
    password: "user",
    role: "user",
  },
];

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  console.log(username);
  try {
    // FAKE SERVER DELAY, ERROR
    await new Promise((resolve, reject) => {
      const serverError = false;
      if (serverError)
        reject({
          name: "ServerError",
          message: "Don't worry we are fixing it, please try again later",
        });
      else {
        setTimeout(resolve, 1000);
      }
    });

    const user = fakeUsers.find((user) => user.username === username);

    if (!user)
      return res.status(403).json({
        name: "InvalidUser",
        message: "User doesn't exists on database",
      });

    if (user.password !== password)
      return res.status(403).json({
        name: "WrongPassword",
        message: "Password is not correct",
      });

    const token = jwt.sign(
      { username: username, role: user.role },
      process.env.JWT_KEY,
      {
        expiresIn: "5m",
      }
    );
    res.status(200).json({ token: token, username: username });
  } catch (error) {
    console.log({
      name: error.name,
      message: error.message,
    });
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

module.exports = router;
