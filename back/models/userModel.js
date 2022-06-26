const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const ItemsSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, maxLength: 50, required: true },
    category: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 12,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 100,
    },
    items: [ItemsSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 8);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = new mongoose.model("Users", userSchema);

const testUsers = new Users({
  name: "Jonas",
  email: "jonas@gmail.com",
  password: "Jonas123456",
  items: [
    { name: "", category: "", date: "2022-05-23" },
  ],
});

// testUsers.save();

module.exports = Users;
