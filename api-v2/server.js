const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Atlas are connected successfully!');
    })
    .catch((error) => {
        console.error('Error while mongo is connected: ', error);
    });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
