import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import bookRouter from './routes/bookRoutes';
import userRouter from './routes/userRoutes';
import config from './config/config';

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() =>
    app.listen(config.server.port, () =>
      console.log(
        'Connected to MongoDB Database',
        '\n',
        `Listening on port ${config.server.port}...`
      )
    )
  )
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/books', bookRouter);
app.use('/users', userRouter);
