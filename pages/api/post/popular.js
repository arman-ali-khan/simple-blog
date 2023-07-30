import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {

  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find({aproved:true,publish:true}).sort({view:-1}).limit(5).toArray();
  res.status(200).send(posts);
}
