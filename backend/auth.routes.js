// Euan Chree
// 1912490

// Imports
import express from "express";
import authCtrl from "./auth.controller.js"

// Creating the router
const router = express.Router()

// Route to sign in
router.route("/auth/signin")
    .post((authCtrl.signin))

// Route to sign out
router.route("/auth/signout")
    .get(authCtrl.signout)

export default router