const News = require('../models/News');

module.exports = {
  async index(req, res) {
    if (!req.params.id) {
      await News.find({}, {
        image: 1,
        briefTitle: 1,
        description: 1,
        date: 1,
      }).sort({ date: 'desc' })
        .exec()
        .then((news) => res.status(200)
          .json(news))
        .catch((err) => res.status(500)
          .json({
            message: 'Error finding all news',
            error: err,
          }));
    } else {
      await News.findById(req.params.id)
        .exec()
        .then((news) => res.status(200)
          .json(news))
        .catch((err) => res.status(500)
          .json({
            message: 'Error finding specific news',
            error: err,
          }));
    }
  },

  async store(req, res) {
    await News.create(req.body, (err, news) => {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(news);
    });
  },

  async update(req, res) {
    await News.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then((news) => res.status(200)
        .json(news))
      .catch((err) => res.status(500)
        .json({
          message: 'Error updating specific news',
          error: err,
        }));
  },
};
