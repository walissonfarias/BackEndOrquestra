const News = require('../models/News');

module.exports = {
  async index(req, res) {
    if (!req.params.id) {
      const { page = 1 } = req.query;
      const options = {
        page,
        limit: 6,
        select: 'image briefTitle description date',
        sort: { date: 'desc' },
      };

      await News.paginate({}, options, (err, news) => {
        if (err) {
          return res.status(500).json({
            message: 'Error finding all news',
            error: err,
          });
        }
        return res.status(200).json(news);
      });
    } else {
      await News.findById(req.params.id)
        .exec((err, news) => {
          if (err) {
            return res.status(500).json({
              message: 'Error finding specific news',
              error: err,
            });
          }
          return res.status(200).json(news);
        });
    }
  },

  async store(req, res) {
    await News.create(req.body, (err, news) => {
      if (err) {
        return res.status(400).json({
          message: 'Error creating new news',
          error: err,
        });
      }
      return res.status(200).json(news);
    });
  },

  async update(req, res) {
    await News.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec((err, news) => {
        if (err) {
          return res.status(500).json({
            message: 'Error updating specific news',
            error: err,
          });
        }
        return res.status(200).json(news);
      });
  },

  async destroy(req, res) {
    await News.findByIdAndDelete(req.params.id)
      .exec((err, news) => {
        if (err) {
          return res.status(500).json({
            message: 'Error deleting specific news',
            error: err,
          });
        }
        return res.status(200).json(news);
      });
  },
};
