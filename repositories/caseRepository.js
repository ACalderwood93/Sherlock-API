const { initClient } = require("../util/mongoHelper");

const DB_NAME = "sherlock";
const COLLECTION_NAME = "cases";
const getCase = async (caseNumber) => {
  const client = initClient();
  try {
    client.connect();

    const database = client.db(DB_NAME);
    const savedCases = database.collection(COLLECTION_NAME);

    const query = { number: caseNumber };
    const savedCase = await savedCases.findOne(query);
    return savedCase;
  } finally {
    client.close();
  }
};

const getAll = async () => {
  const client = initClient();
  try {
    client.connect();

    const database = client.db(DB_NAME);
    const casesCollection = database.collection(COLLECTION_NAME);
    const savedCases = await casesCollection.find({}).toArray();
    return savedCases;
  } finally {
    client.close();
  }
};

const upsertCase = async (caseInput) => {
  const client = initClient();
  try {
    client.connect();

    const database = client.db(DB_NAME);
    const casesCollection = database.collection(COLLECTION_NAME);
    const query = { number: caseInput.input.number };
    const update = { $set: caseInput.input };
    const options = { upsert: true };
    const value = await casesCollection.updateOne(query, update, options);
    return value;
  } finally {
    client.close();
  }
};

module.exports = {
  getCase,
  getAll,
  upsertCase,
};
