import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  const { email, username } = req.query;

  const { db } = await connectToDatabase();
  if (email) {
    const result = await db.collection("users").findOne({ email: email });
    // const posts = await db.collection("posts").find({}).toArray();
    return res.status(200).send(result);
  }
  const result = await db.collection("users").findOne({ username: username });
  // const posts = await db.collection("posts").find({}).toArray();
  res.status(200).send(result);
}
