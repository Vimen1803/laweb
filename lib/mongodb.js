import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const werewolfUri = process.env.WEREWOLF_MONGODB_URI || uri;
const options = {};

let client;
let clientPromise;

let werewolfClient;
let werewolfClientPromise;

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

  if (!global._werewolfMongoClientPromise) {
    werewolfClient = new MongoClient(werewolfUri, options);
    global._werewolfMongoClientPromise = werewolfClient.connect();
  }
  werewolfClientPromise = global._werewolfMongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  werewolfClient = new MongoClient(werewolfUri, options);
  werewolfClientPromise = werewolfClient.connect();
}

export { werewolfClientPromise };
export default clientPromise;
