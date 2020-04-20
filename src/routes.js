const { Router } = require('express');

const NewsController = require('./controllers/NewsController');
const EventController = require('./controllers/EventController');

const routes = Router();

routes.get('/news', NewsController.index);
routes.get('/news/:id', NewsController.index);
routes.post('/news', NewsController.store);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.destroy);

routes.get('/events', EventController.index);
routes.get('/events/:id', EventController.index);
routes.post('/events', EventController.store);
routes.put('/events/:id', EventController.update);
routes.delete('/events/:id', EventController.destroy);

module.exports = routes;
