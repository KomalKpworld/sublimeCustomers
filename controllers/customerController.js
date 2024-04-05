
const Customer = require('../models/customer');

const listCustomers = async (req, res) => {
  try {
    let { first_name, last_name, city, page, limit } = req.query;
    if (!limit) limit = 10
    if (!page) page = 1
    const offset = (page - 1) * limit;
    const whereClause = {};
    if (first_name) whereClause.first_name = first_name;
    if (last_name) whereClause.last_name = last_name;
    if (city) whereClause.city = city;
    const customers = await Customer.findAll({
      where: whereClause,
      offset,
      limit
    });
    res.status(200).send({ status: true, message: "get sustomer list succeessfully", data: customers });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message, data: null });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).send({ status: false, message: 'Customer not found', data: null });
    }
    res.status(200).send({ status: true, message: "get customer by its Id", data: customer });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message, data: null });
  }
};
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

const addCustomer = async (req, res) => {
  try {
    const { first_name, last_name, city, company } = req.body;
    if (!first_name || !last_name || !city || !company) {
      return res.status(400).send({ status: false, message: 'All fields are required', data: null });
    }
    const newCustomer = await Customer.create({ first_name, last_name, city, company });
    res.status(201).send({ status: true, message: 'Customer creatd successfully', data: newCustomer });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message, data: null });
  }
};

module.exports = { getCustomerById, listCitiesWithCustomerCount, addCustomer, listCustomers }