'use strict';

const {sequelize, models} = require('./models');
const routes = require('./routes')
const cors = require('cors');

// load modules
const express = require('express');
const morgan = require('morgan');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();


// Setup request body to parse JSON // <--- otherwise req.body returns undefined.
app.use(express.json());

app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});


//Getting routes and adding /api ///
app.use('/api', routes);




// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);



//Testing the database connection//
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB established...')
  } catch(err) {
    console.log('Connection to DB failed...', err);
  }
})();



// start listening on our port
sequelize.sync()
  .then( () => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });
