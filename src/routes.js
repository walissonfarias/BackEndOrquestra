const { Router } = require('express');

const NewsController = require('./controllers/NewsController');
const EventsController = require('./controllers/EventsController');

const routes = Router();

routes.get('/news', NewsController.index);
routes.get('/news/:id', NewsController.index);
routes.post('/news', NewsController.store);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.destroy);

routes.get('/events', EventsController.index);
routes.get('/events/:id', EventsController.index);
routes.post('/events', EventsController.store);

module.exports = routes;
