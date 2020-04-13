const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const uri = process.env.DATABASE_URL;
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
