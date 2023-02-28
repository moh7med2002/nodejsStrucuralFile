const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("No Auth");
      error.statusCode = 403;
      throw error;
    }
    const token = authHeader;
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "token");
    } catch (err) {
      throw err;
    }
    if (!decodedToken) {
      const error = new Error("No Auth");
      error.statusCode = 403;
      throw error;
    }
    if (!decodedToken.adminId) {
      const error = new Error("Wrong Auth");
      error.statusCode = 403;
      throw error;
    }
    req.adminId = decodedToken.adminId;
    return next();
  } catch (error) {
    next(error);
  }
};
