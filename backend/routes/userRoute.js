const express = require("express");
const router = express.Router();
const { postUserSignUp, postUserSignIn, getUserProfile, putUpdateUserProfile, deleteAccount } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// public routes
router.post("/users/signup", upload.single("profile_pic") ,postUserSignUp);
router.post("/users/signin", postUserSignIn)

// protected routes
router.get("/users/profile", protect, getUserProfile);
router.put("/users/profile", protect, upload.single("profile_pic"), putUpdateUserProfile);
router.delete("/users/account", protect, deleteAccount);

module.exports = router;