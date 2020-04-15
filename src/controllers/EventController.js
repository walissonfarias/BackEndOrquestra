const Event = require('../models/Event');

module.exports = {
  async index(req, res) {
    if (!req.params.id) {
      const { page = 1 } = req.query;
      const options = {
        page,
        limit: 5,
        select: 'name tour date hour local',
        sort: { date: 'asc' },
      };

      await Event.paginate({}, options, (err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error finding all events',
            error: err,
          });
        }
        return res.status(200).json(event);
      });
    } else {
      await Event.findById(req.params.id)
        .exec((err, event) => {
          if (err) {
            return res.status(500).json({
              message: 'Error finding specific event',
              error: err,
            });
          }
          return res.status(200).json(event);
        });
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
    await Event.create({
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
    }, (err, event) => {
      if (err) {
        return res.status(400).json({
          message: 'Error creating new event',
          error: err,
        });
      }
      return res.status(200).json(event);
    });
  },

  async update(req, res) {
    await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec((err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error updating specific event',
            error: err,
          });
        }
        return res.status(200).json(event);
      });
  },

  async destroy(req, res) {
    await Event.findByIdAndDelete(req.params.id)
      .exec((err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error deleting specific event',
            error: err,
          });
        }
        return res.status(200).json(event);
      });
  },
};
