const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require("../config/jwt");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
try {
  const auth = req.headers.authorization; //récupère le token dans le header de la requète
  if (auth) {
    const token = auth.split(" ")[1]; //enlève Bearer
    const decodedToken = jsonwebtoken.verify(token, JWT_SECRET); //vérifie le token
    const user = await User.findById(
      decodedToken.sub,
      "-__v -password",
      {}
    ).exec();
    req.user = user;
  }
  next();
} catch (e) {
  console.log(e);
  next(e);
}
};