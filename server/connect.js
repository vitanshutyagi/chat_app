const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/chatApp",
    )
    .then(() => {
        console.log("DB connected.");
    })
    .catch((err) => {
        console.log("Error in DB connection : ",err);
        process.exit(1)
    });
}

module.exports = connect;