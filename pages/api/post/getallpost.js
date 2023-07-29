import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {page}  = req.query;

  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } } }
  const posts = await db.collection("posts").find({}).sort({_id:-1}).skip(parseInt(page)*10).limit(10).toArray();
  // const posts = await db.collection("posts").find({}).toArray();
  const count = posts.length
  res.status(200).send({count,posts});
}
