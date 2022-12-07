const mongoose = require("mongoose");

const userSchema = mongoose.Scenma(
  {
    email: {
      type: String,
      require: [true, "Email is required"],
    },
    firstName: {
      type: String,
      require: [true, "First name is required"],
    },
    lastName: {
      type: String,
      require: [true, "Last name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // more optional data to be added such as address, payment info, registry, etc
  },
  {
    // time of signup
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
