import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {page}  = req.query;

  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } },aproved:true,publish:true }
  // const posts = await db.collection("posts").find(filter).toArray();
  const categories = await db.collection("categories").find({}).toArray();
//   const count = await db.collection("posts").estimatedDocumentCount()
  res.status(200).send(categories);
}
