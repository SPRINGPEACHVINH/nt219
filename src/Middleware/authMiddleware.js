const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  // Added 'next' to the parameters
  if (!req.headers.token) {
    return res.status(401).json({
      // Changed status code to 401 for unauthorized
      status: "ERROR",
      message: "No token provided",
    });
  }

  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        // Changed status code to 401 for unauthorized
        status: "ERROR",
        message: "Unauthorized",
      });
    }
    if (decoded.payload.isAdmin == true) {
      // Changed from 'payload' to 'decoded'
      next(); // Call 'next()' to proceed to the next middleware or route handler
    } else {
      return res.status(403).json({
        // Changed status code to 403 for forbidden
        status: "ERROR",
        message: "Access denied",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  // Added 'next' to the parameters
  if (!req.headers.token) {
    return res.status(401).json({
      // Changed status code to 401 for unauthorized
      status: "ERROR",
      message: "No token provided",
    });
  }

  const userId = req.params.id;
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        // Changed status code to 401 for unauthorized
        status: "ERROR",
        message: "Unauthorized",
      });
    }
    if (decoded.payload?.isAdmin || decoded.payload?.id == userId) {
      // Changed from 'payload' to 'decoded'
      next(); // Call 'next()' to proceed to the next middleware or route handler
    } else {
      return res.status(403).json({
        // Changed status code to 403 for forbidden
        status: "ERROR",
        message: "Access denied",
      });
    }
  });
};

const authTransferMiddleware = (req, res, next) => {
  // Added 'next' to the parameters
  if (!req.headers.token) {
    return res.status(401).json({
      // Changed status code to 401 for unauthorized
      status: "ERROR",
      message: "No token provided",
    });
  }

  const userId = req.params.id;
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        // Changed status code to 401 for unauthorized
        status: "ERROR",
        message: "Unauthorized",
      });
    }
    if (decoded.payload?.id == userId) {
      // Changed from 'payload' to 'decoded'
      next(); // Call 'next()' to proceed to the next middleware or route handler
    } else {
      return res.status(403).json({
        // Changed status code to 403 for forbidden
        status: "ERROR",
        message: "Access denied",
      });
    }
  });
};

const authVerifyMiddleware = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({
      status: "ERROR",
      message: "No token provided",
    });
  }

  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: "ERROR",
        message: "Unauthorized",
      });
    }
    if (decoded.payload?.isVerified || decoded.payload?.id == userId) {
      next();
    } else {
      return res.status(403).json({
        status: "ERROR",
        message: "Access denied",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
  authVerifyMiddleware,
  authTransferMiddleware,
};
