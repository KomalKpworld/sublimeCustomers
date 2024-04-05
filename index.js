// app.js

const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const cityRoutes = require('./routes/cityRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/customers', customerRoutes);
app.use('/cities', cityRoutes);

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
