const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.get("/", UserController.users_get_all);

router.post("/", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get("/:userId", UserController.users_get_user);

router.put("/:userId", UserController.users_update_user);

//router.delete("/:userId", checkAuth, UserController.user_delete);

router.delete("/:userId", UserController.user_delete);


module.exports = router;
