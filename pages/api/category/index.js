import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {page}  = req.query;

  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } } }
  // const allFiles = await db.collection("products").find({}).skip(parseInt(page)*10).limit(10).toArray();
  const categories = await db.collection("categories").find({}).toArray();
//   const count = await db.collection("posts").estimatedDocumentCount()
  res.status(200).send(categories);
}
