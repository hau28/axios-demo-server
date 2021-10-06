var jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 500);
    });

    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({
        name: "UnauthorizedError",
        message: "Sign in to view this content",
      });
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            name: err.name,
            message: "User token expired",
          });
        }
        return res.status(401).json({
          name: err.name,
          message: err.message,
        });
      }
      req.auth = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

module.exports = auth;
