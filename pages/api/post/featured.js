import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {


  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find({featured:true}).sort({_id:-1}).toArray();
  res.status(200).send(posts);
}
