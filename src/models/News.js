const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const newsSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  briefTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

newsSchema.plugin(mongoosePaginate);

const News = mongoose.model('News', newsSchema);

module.exports = News;
