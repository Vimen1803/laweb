import clientPromise from './lib/mongodb.js';

async function listCollections() {
  const client = await clientPromise;
  const db = client.db('labot');
  const collections = await db.listCollections().toArray();
  console.log(collections.map(c => c.name));
  process.exit(0);
}

listCollections();
