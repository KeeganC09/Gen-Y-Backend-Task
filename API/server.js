const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const db = require("./database/db");
const userRoute = require('./Routes/authRoute');
const postRoute = require('./Routes/postRoute')

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/', userRoute);
app.use('/post', postRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
});

