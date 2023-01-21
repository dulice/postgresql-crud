const express = require('express');
require('dotenv').config();
const app = express();
const userRoute = require('./user.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoute);
app.listen(3000, () => {
    console.log('listening on port 3000');
})