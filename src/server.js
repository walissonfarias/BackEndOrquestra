const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

let uri;

if (process.env.DEVELOPMENT === 'true') {
  uri = process.env.DATABASE_TEST_URL;
} else {
  uri = process.env.DATABASE_URL;
}
mongoose.connect(uri, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false,
});
const { connection } = mongoose;
connection.on('error', (error) => console.error(error));
connection.once('open', () => console.log('Connected to Mongoose'));

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(routes);

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});
