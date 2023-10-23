// Euan Chree
// 1912490

// Imports
import express from "express";
import userCtrl from "./user.controller.js";
import authCtrl from "./auth.controller.js";

// Creating the router
const router = express.Router()

// Users routes
router.route('/api/users')
    // Route to list all the users
    .get(userCtrl.list)
    // Route to create a user
    .post(userCtrl.create)

// Quote route
router.route('/api/quote')
    .post(userCtrl.calculatePrice)

// User routes, 
router.route('/api/users/:userId')
    // Route to get information on a user
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
    // Route to update a user
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    // Route to remove a user
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// User id parameter
router.param('userId', userCtrl.userByID)

// Exporting
export default router