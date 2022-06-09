const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name_user: {
    type: String,
    /* require: true,
    min: 3, */
  },
  lastname: {
    type: String,
    /* require: true,
    min: 3, */
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    /* require: true, */
  },
  role: {
    type: String,
    /* require: true, */
  },
  avatar: {
    type: String,
    /* require: false, */
  },
});

module.exports = mongoose.model("users", UserSchema);
