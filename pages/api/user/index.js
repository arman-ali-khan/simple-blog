import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {email}  = req.query;

  const { db } = await connectToDatabase();
  const result = await db.collection("users").findOne({email:email});
  // const posts = await db.collection("posts").find({}).toArray();
  res.status(200).send(result);
}
