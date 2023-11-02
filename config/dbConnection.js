const mongoose = require('mongoose');

const dbConnection = async () => {
   try {
    await mongoose.connect(process.env.MONGO_URI)
    .then((conn) => console.log('Connected to database', conn.connection.host))
   } catch (error) {
    console.log(error.message);
    process.exit(1)
   }
}

module.exports = dbConnection;