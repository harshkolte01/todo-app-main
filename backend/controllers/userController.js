const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const transporter = require("../config/nodeMailerConfig");
const path = require("path");
const cloudinary = require("../config/cloudinaryConfig");

const SALT_ROUND = Number(process.env.PASSWORD_SALT_ROUNDS);
const JWT_EXPIRY = process.env.JWT_EXPIRY;
const SECRET_KEY = process.env.JWT_SECRET_KEY;


// For User Account Creation
exports.postUserSignUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const profile_pic = req.file;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already exists." });
            }
            return res.status(400).json({ message: "Username already taken." });
        }

        // Handle profile picture upload with error handling
        let picUrl = "";
        if (profile_pic) {
            try {
                const uploadPic = await cloudinary.uploader.upload(
                    `data:${profile_pic.mimetype};base64,${profile_pic.buffer.toString("base64")}`,
                    { folder: "profile_pics" }
                );
                picUrl = uploadPic.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload failed:", uploadError.message);
                // Continue signup without profile picture instead of failing entire registration
            }
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const user = new User({ username, email, password: hashedPassword, profile_pic: picUrl });
        await user.save();
        res.status(201).json({ message: "User Registered Successfully." })

        const templatePath = path.join(__dirname, "../emails/Welcome.html");
        let emailTemplate = fs.readFileSync(templatePath, "utf-8");
        emailTemplate = emailTemplate.replace(/{{username}}/g, username);

        const mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "Welcome to TODO Web Applications",
            html: emailTemplate
        };

        transporter.sendMail(mailOptions).catch((error) => {
            console.log("Email Sending Failed.", error.message);

        });


    } catch (error) {
        next(error);
    }
}

// For user signin
exports.postUserSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials ' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password ' });
        const token = jwt.sign({
            userId: user._id,
            email: user.email
        },
            SECRET_KEY,
            { expiresIn: JWT_EXPIRY });
        res.json({ token, message: "Signin Successful" });
    } catch (error) {
        next(error);
    }
}

// For get current user profile
exports.getUserProfile = async (req, res, next) => {
    try {
        res.json({
            user: {

                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                profile_pic: req.user.profile_pic
            }
        });
    } catch (error) {
        next(error);
    }
}

// Update user profile
exports.putUpdateUserProfile = async (req, res, next) => {
    try {
        const { username } = req.body;
        const profile_pic = req.file;

        const updateData = {};
        if (username) updateData.username = username.trim();

        if (profile_pic) {
            try {
                const uploadPic = await cloudinary.uploader.upload(`data:${profile_pic.mimetype};base64,${profile_pic.buffer.toString("base64")}`, {
                    folder: "profile_pics"
                });
                updateData.profile_pic = uploadPic.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload failed: ", uploadError.message);
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
            new: true,
            runValidators: true
        }).select("-password");
        res.json({
            message: "Profile updated successfully.", user: updatedUser
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteAccount = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.json({ message: "Account deleted. " });
    } catch (error) {
        next(error);
    }
}