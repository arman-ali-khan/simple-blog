import { connectToDatabase } from "../../../../lib/db";




export default async function handler(req, res) {
    const {id}  = req.query;

  const { db } = await connectToDatabase();
  const replies = await db.collection("replies").find({commentId:id}).toArray();
  res.status(200).send(replies);
}
