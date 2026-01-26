const mongoose = require('mongoose');
const ConnectionRequest = require('./src/models/connectionRequest');
const dotenv = require('dotenv');

dotenv.config();

const resetFeed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const result = await ConnectionRequest.deleteMany({});
        console.log(`Deleted ${result.deletedCount} connection requests. Feed reset!`);

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

resetFeed();
