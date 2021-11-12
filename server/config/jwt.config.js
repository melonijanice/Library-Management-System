const jwt = require("jsonwebtoken");
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
module.exports.authorize = (req, res, next) => {


var decoded = jwt.decode(req.cookies.usertoken, {complete: true});

if (decoded.payload.user_role=="users") {

  res.status(401).json({ verified: false });
} else {
  next();
}
};
