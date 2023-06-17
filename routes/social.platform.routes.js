// import { Router } from "express";
import { getUsers, createUsers, getOneUser, updateUser, deleteUser } from "../controllers/social.platform.controller.js";



const socialPlatformRoutes = (app) => {
  app.route("/users").get(getUsers).post(createUsers);
  app.route("/users/:username").get(getOneUser).put(updateUser).delete(deleteUser);

};

// const ExpenseTrackerRoutes = Router()
// ExpenseTrackerRoutes.get('',accountRequired, getUsers)
// ExpenseTrackerRoutes.get('/:Username', getOneUser)


export default socialPlatformRoutes;
