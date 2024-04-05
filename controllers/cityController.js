const Customer = require('../models/customer');
const sequelize = require('../config/database'); 
const listCitiesWithCustomerCount = async (req, res) => {
  try {
    const citiesWithCounts = await Customer.findAll({
      attributes: ['city', [sequelize.fn('COUNT', sequelize.col('city')), 'count']],
      group: ['city']
    });
    const citiesData = citiesWithCounts.map(cityData => ({
      city: cityData.city,
      count: cityData.get('count')
    }));
    res.status(200).send({ status: true, message: "get customer with count", data: citiesData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message, data: null });
  }
};
module.exports={listCitiesWithCustomerCount}