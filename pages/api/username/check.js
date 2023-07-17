import { connectToDatabase } from "../../../lib/db";


export default async function handler(req, res) {
    const {username}  = req.query;

  const { db } = await connectToDatabase();
//   const filter = { tags: { $elemMatch: { label: tag } } }
  const result = await db.collection("users").find({username:username}).toArray();
  res.status(200).send(result);
}
