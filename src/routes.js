const { Router } = require('express');

const NewsController = require('./controllers/NewsController');

const routes = Router();

routes.get('/news', NewsController.index);
routes.get('/news/:id', NewsController.index);
routes.post('/news', NewsController.store);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.destroy);

module.exports = routes;
