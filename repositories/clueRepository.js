const { initClient } = require("../util/mongoHelper");

const DB_NAME = "sherlock";
const COLLECTION_NAME = "clues";
const getClue = async (clueNumber) => {
  const client = initClient();
  try {
    client.connect();

    const database = client.db(DB_NAME);
    const cluesCollection = database.collection(COLLECTION_NAME);

    const query = { number: clueNumber };
    const clue = await cluesCollection.findOne(query);
    return clue;
  } finally {
    client.close();
  }
};

module.exports = {
  getClue,
};
