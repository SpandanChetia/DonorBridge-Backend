const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/dpoeooxra/image/upload/v1683117175/profile%20pic/default_ljqs1s.png",
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
  fundraisers: [{ type: ObjectId, ref: "Fundraiser" }],
});

userSchema.pre("findOne", function (next) {
  this.populate("fundraisers");
  next();
});

userSchema.pre("find", function (next) {
  this.populate("fundraisers");
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
