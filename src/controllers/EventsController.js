const Events = require('../models/Events');

module.exports = {
  async index(req, res) {
    if (!req.params.id) {
      await Events.find({}, {
        name: 1,
        tour: 1,
        date: 1,
        hour: 1,
        local: 1,
      }).sort({ date: 'asc' })
        .exec()
        .then((events) => res.status(200)
          .json(events))
        .catch((err) => res.status(500)
          .json({
            message: 'Error finding all events',
            error: err,
          }));
    } else {
      await Events.findById(req.params.id)
        .exec()
        .then((events) => res.status(200)
          .json(events))
        .catch((err) => res.status(500)
          .json({
            message: 'Error finding specific events',
            error: err,
          }));
    }
  },

  async store(req, res) {
    const {
      name,
      tour,
      date,
      start,
      end,
      local,
      address,
      lat,
      long,
      duration,
      classification,
      description,
    } = req.body;

    const hour = {
      start,
      end,
    };
    const location = {
      type: 'Point',
      coordinates: [long, lat],
    };
    await Events.create({
      name,
      tour,
      date,
      hour,
      local,
      address,
      location,
      duration,
      classification,
      description,
    }, (err, events) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(events);
    });
  },
};
