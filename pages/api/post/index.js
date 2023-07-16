import { connectToDatabase } from "@/lib/db";




export default async function handler(req, res) {
    const {page}  = req.query;

  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } } }
  const posts = await db.collection("posts").find({}).skip(parseInt(page)*10).limit(10).toArray();
  // const posts = await db.collection("posts").find({}).toArray();
  const count = await db.collection("posts").estimatedDocumentCount()
  res.status(200).send({count,posts});
}
