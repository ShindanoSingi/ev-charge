const express = require('express');
require('dotenv').config({ path: './config/.env' });
const app = express();
const dbConfig = require('./config/dbconfig');
const port = process.env.PORT || 4000;

// Connect to MongoDB database
const usersRoute = require('./routes/usersRoute');
const stationsRoute = require('./routes/stationsRoute');

app.use(express.json());

const server = require('http').createServer(app);

app.use('/api/users', usersRoute);
app.use('/api/stations', stationsRoute);

server.listen(port, () =>
    console.log(`Server started on port ${port}`)
);