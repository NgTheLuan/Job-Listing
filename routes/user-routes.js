import express from "express";

import {
  signup,
  login,
  getUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
  getUserByUsername,
  addFavoriteJob,
} from "../controllers/user-controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:uid", getUserById);
router.get("/uusername", getUserByUsername);
router.patch("/:uid", updateUserByAdmin);
router.delete("/:uid", deleteUser);
router.patch("/addfavoritejob/:uid", addFavoriteJob);

export default router;
