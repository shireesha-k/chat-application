import express from "express";
import { checkAuth,login, logout, signup,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router();
// functions for signup login and logout
router.post("/signup", signup);

router.post("/login",login);

router.post("/logout",logout);

// function for profile page,we dont want to allow to every user only authonticated people soo protected middleware
router.put("/update-profile",protectRoute,updateProfile);

//It will check user is authonticated or not
router.get("/check",protectRoute,checkAuth);


export default router;