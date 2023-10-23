const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then((conn) => console.log('Connected to database', conn.connection.host))
}

module.exports = dbConnection;