const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tour: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hour: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  local: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  duration: {
    type: String,
  },
  classification: {
    type: String,
    enum: ['Livre', 10, 12, 14, 16, 18],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

eventSchema.index({ location: '2dsphere' });

eventSchema.plugin(mongoosePaginate);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
