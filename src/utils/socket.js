const socketio = require("socket.io");
const Chat = require("../models/chat");

const initializeSocket = (server) => {
    const io = socketio(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("joinChat", ({ userId, targetUserId }) => {
            // Create a unique room ID for the pair
            const roomId = [userId, targetUserId].sort().join("_");
            socket.join(roomId);
            console.log(`User ${userId} joined room ${roomId}`);
        });

        socket.on("sendMessage", async ({ senderId, targetUserId, text }) => {
            try {
                const roomId = [senderId, targetUserId].sort().join("_");

                // Save message to DB
                let chat = await Chat.findOne({
                    participants: { $all: [senderId, targetUserId] },
                });

                if (!chat) {
                    chat = new Chat({
                        participants: [senderId, targetUserId],
                        messages: [],
                    });
                }

                chat.messages.push({ senderId, text });
                await chat.save();

                // Emit message to the room
                io.to(roomId).emit("receiveMessage", {
                    senderId,
                    text,
                    createdAt: new Date(),
                });
            } catch (error) {
                console.error("Error sending message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = initializeSocket;
