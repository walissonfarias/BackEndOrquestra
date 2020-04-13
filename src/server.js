const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.API_SERVER_PORT || 8000;

const uri = process.env.DATABASE_URL || 'mongodb+srv://squadverde:squadverde123@clusterop-oruka.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.on('error', (error) => console.error(error));
connection.once('open', () => console.log('Connected to Mongoose'));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});
