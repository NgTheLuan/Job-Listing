import User from "../models/User-models.js";
import Job from "../models/Job-models.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const getUsers = async (req, res, next) => {
  let user;
  try {
    user = await User.find({}, "-password");
  } catch {
    res.status(500).json("Load user data failed.");
  }
  res.json({ user: user.map((u) => u.toObject({ getters: true })) });
};

export const signup = async (req, res, next) => {
  try {
    const {
      userName,
      email,
      passwordHash,
      confirmPassword,
      role = "user",
    } = req.body;

    if (!userName || !email || !passwordHash || !confirmPassword)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (passwordHash.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (passwordHash !== confirmPassword)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already existed.",
      });

    const password = await bcrypt.hash(passwordHash, 8);

    const createdUser = new User({
      userName,
      email,
      password,
      role,
    });

    try {
      await createdUser.save();
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: "Some thing went wrong, please try again" });
    }

    res.status(201).json({
      Message: "Sign up successfull.",
      user: createdUser.toObject({ getters: true }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, passwordHash } = req.body;

    if (!email || !passwordHash)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: "Email is not existed, please try another email.",
      });
    const passwordCorrect = await bcrypt.compare(
      passwordHash,
      existingUser.password
    );
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "Wrong email or password, please try again." });
    res.status(201).json({
      Message: "Sign in successfull.",
      user: existingUser.toObject({ getters: true }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    res.status(500).json("Can not find this user.");
  }
  if (!user) {
    return res.status(500).json("Can not find this user.");
  }
  res.json({ user: user.toObject({ getters: true }) });
};

export const getUserByUsername = async (req, res, next) => {
  const userName = req.params.uusername;
  let user;
  try {
    user = await User.findOne(userName);
  } catch (err) {
    res.status(500).json("Something went wrong.");
  }
  if (!user) {
    return res.status(500).json("Can not find this user.");
  }
  res.json({ user: user.toObject({ getters: true }) });
};

export const updateUserByAdmin = async (req, res, next) => {
  const { userName, email, role } = req.body;
  const userId = req.params.uid;

  if (!userName || !email || !role)
    return res
      .status(400)
      .json({ errorMessage: "All fields should not empty." });

  let update;
  try {
    update = await User.findById(userId);
  } catch {
    return res.status(401).json({ errorMessage: "Can not find this user." });
  }

  update.userName = userName;
  update.email = email;
  update.role = role;

  try {
    await update.save();
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "Update user failed, please try again." });
  }
  res.status(201).json({
    Message: "Update user successfully.",
    user: update.toObject({ getters: true }),
  });
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("cvs");
    console.log(user);
  } catch {
    return res
      .status(500)
      .json({ errorMessage: "You can not delete this user." });
  }

  if (!user) {
    return res.status(500).json({ errorMessage: "Can not find this user." });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await sess.commitTransaction();
  } catch {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, please try again." });
  }
  res.status(201).json({ Message: "Delete user successfully." });
};

export const addFavoriteJob = async (req, res) => {
  // try {
  //   const user = await User.findById(req.user.id);
  //   if (!user) return res.status(400).json({ msg: "User does not exist." });

  //   await User.findOneAndUpdate(
  //     { _id: req.user.id },
  //     // { favorite: req.body.favorite },
  //   );

  //   return res.json({ msg: "Added to favorite job" });
  // } catch (err) {
  //   return res.status(500).json({ msg: err.message });
  // }
  /********************************************/

  const { favorite } = req.body;
  const userId = req.params.uid;

  // if (!userName || !email || !role)
  //   return res
  //     .status(400)
  //     .json({ errorMessage: "All fields should not empty." });

  let favoritejob;
  try {
    favoritejob = await User.findById(userId);
  } catch {
    return res.status(401).json({ errorMessage: "Can not find this user." });
  }

  favoritejob.favorite = favorite;

  try {
    await favoritejob.save();
  } catch {
    return res
      .status(400)
      .json({ errorMessage: "Update user failed, please try again." });
  }
  res.status(201).json({
    Message: "Update user successfully.",
    user: favoritejob.toObject({ getters: true }),
  });
};
