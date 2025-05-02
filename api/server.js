const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');


const connectDB = require('./config/db');

// Route files
// const bootcamps = require('./routes/bootcamps');
const userRoutes = require('./routes/user.route');

// Load env vars
dotenv.config({ path: './api/config/config.env' });

// connect to mongo db
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
// app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', userRoutes);

//Mount errorHandler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


process.on('unhandledRejection', (err, promise)=> {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
  }
)
