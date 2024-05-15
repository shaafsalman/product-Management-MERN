const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(process.env.DB, connectionParams);
    const db = mongoose.connection;

    db.once("open", async () => {
        console.log("Connected to database successfully");

        const dbName = mongoose.connection.name;
        console.log(`Database Name: ${dbName}`);

        try {
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log("Collections in the Database:");
            collections.forEach(collection => {
                console.log(collection.name);
            });
        } catch (err) {
            console.error("Error retrieving collections:", err);
        }
    });

    db.on("error", (error) => {
        console.error(error);
        console.error("Could not connect to the database!");
    });
};
