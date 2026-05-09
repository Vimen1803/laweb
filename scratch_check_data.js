import clientPromise from './lib/mongodb.js';
import { Long } from 'mongodb';

async function checkData() {
  const client = await clientPromise;
  const db = client.db('labot');
  const id = "733055099970125934";
  
  console.log("Searching for ID:", id);
  
  const longId = Long.fromString(id);
  const numberId = Number(id);
  
  const res1 = await db.collection('wordle').findOne({ member_id: longId });
  const res2 = await db.collection('wordle').findOne({ member_id: id });
  const res3 = await db.collection('wordle').findOne({ member_id: numberId });
  
  console.log("Results:");
  console.log("As Long:", res1 ? "FOUND" : "NOT FOUND");
  console.log("As String:", res2 ? "FOUND" : "NOT FOUND");
  console.log("As Number:", res3 ? "FOUND" : "NOT FOUND");
  
  if (res1 || res2 || res3) {
      const doc = res1 || res2 || res3;
      console.log("Document keys:", Object.keys(doc));
      console.log("total_wins:", doc.total_wins);
      console.log("played:", doc.played);
  }

  const wwDb = client.db('werewolf');
  const resWw1 = await wwDb.collection('players').findOne({ _id: longId });
  const resWw2 = await wwDb.collection('players').findOne({ _id: id });
  const resWw3 = await wwDb.collection('players').findOne({ _id: numberId });

  console.log("\nWerewolf Results:");
  console.log("As Long:", resWw1 ? "FOUND" : "NOT FOUND");
  console.log("As String:", resWw2 ? "FOUND" : "NOT FOUND");
  console.log("As Number:", resWw3 ? "FOUND" : "NOT FOUND");

  process.exit(0);
}

checkData();
