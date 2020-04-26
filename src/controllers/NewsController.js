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
    await News.findOne({
      image: req.body.image,
      briefTitle: req.body.briefTitle,
      description: req.body.description,
      date: req.body.date,
      title: req.body.title,
      text: req.body.text,
    // eslint-disable-next-line consistent-return
    }, (err, news) => {
      if (err) {
        return res.status(400).json({
          message: 'Error creating new news',
          error: err,
        });
      } if (news) {
        return res.status(400).json({
          message: 'News already exists',
        });
      }
      News.create(req.body, (_err, _news) => {
        if (_err) {
          return res.status(400).json({
            message: 'Error creating new news',
            error: _err,
          });
        }
        return res.status(200).json(_news);
      });
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
