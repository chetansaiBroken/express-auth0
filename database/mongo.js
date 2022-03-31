const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

// MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//       return console.log("Connection failed for some reason");
//     }
//     console.log("Connection established - All well");
//     const db = client.db(databaseName);
//   });
  

let database = null;

async function startDatabase() {
  const mongo = new MongoMemoryServer();
  await mongo.start();
  //const mongoDBURL = await mongo.getConnectionString();
  const mongoDBURL = await mongo.getUri();
  //const mongoDBURL = 'mongodb://localhost:3001';
  const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true,});
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};