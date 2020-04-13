const { Router } = require('express');

const NewsController = require('./controllers/NewsController');

const routes = Router();

routes.get("/", (req, res) => {
  res.send({ hello: "world" });
});

// Mobile news index route
routes.get('/news', NewsController.index);
// Mobile read news route
routes.get('/news/:id', NewsController.index);
// WEB create news route
routes.post('/news', NewsController.store);
// WEB update news route
routes.put('/news/:id', NewsController.update);

module.exports = routes;
