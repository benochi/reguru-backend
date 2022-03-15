require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev-key";

module.exports = {
  SECRET_KEY
}