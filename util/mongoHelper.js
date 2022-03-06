const { MongoClient } = require("mongodb");

const initClient = () => {
  const client = new MongoClient(process.env.MONGO_URL);
  return client;
};

module.exports = {
  initClient,
};
