const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventsSchema = new Schema({
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
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  duration: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    enum: ['Livre'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

eventsSchema.index({ location: '2dsphere' });

const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
