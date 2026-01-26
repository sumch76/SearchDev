const mongoose = require('mongoose');
const User = require('./src/models/user');
const dotenv = require('dotenv');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const userCount = await User.countDocuments({});
        console.log(`Total users in DB: ${userCount}`);

        const users = await User.find({}, 'firstName lastName');
        console.log("Users:", users.map(u => `${u.firstName} ${u.lastName}`).join(", "));

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkDB();
