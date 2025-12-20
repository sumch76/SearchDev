const express = require("express");
const chatRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");

const User = require("../models/user");

chatRouter.get("/chat/:targetUserId", UserAuth, async (req, res) => {
    try {
        const { targetUserId } = req.params;
        const userId = req.user._id;

        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
        }).populate("participants", "firstName lastName photoURL");

        if (!chat) {
            const targetUser = await User.findById(targetUserId).select("firstName lastName photoURL");
            const currentUser = await User.findById(userId).select("firstName lastName photoURL");

            return res.json({
                messages: [],
                participants: [currentUser, targetUser]
            });
        }

        res.json(chat);
    } catch (error) {
        res.status(500).send("Error fetching chat: " + error.message);
    }
});

module.exports = chatRouter;
