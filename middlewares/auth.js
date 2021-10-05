var jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({
        name: "UnauthorizedError",
        message: "you are not currently logged-in",
      });
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err)
        return res.status(401).json({
          name: error.name,
          message: error.message,
        });
      req.auth = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({
        name: "UnauthorizedError",
        message: "you are not currently logged-in",
      });
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err)
        return res.status(401).json({
          name: error.name,
          message: error.message,
        });
      if (decoded.role !== "admin")
        return res.status(403).json({
          name: "ForbiddenError",
          message: "you don't have permission to access this content",
        });
      req.auth = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
