import express from 'express';
import logger from '@selesterkft/express-logger';
import { api, docs, data, localsystem, listview } from './routes';
import errorHandler from './middlewares/error-handler';

const cors = require('cors');
const app = express();

app.use(logger.middleware());
app.use('/api', api);
app.use('/api-docs', docs);
app.use('/data', data);
app.use(errorHandler);
app.use('/localsystem', localsystem);
app.use('/listview', listview);

export default app;
