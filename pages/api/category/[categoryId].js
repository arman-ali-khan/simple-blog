import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
    const {categoryId}  = req.query;
  const { db } = await connectToDatabase();
  const filter = { categories: { $elemMatch: { value: categoryId } } }
  const posts = await db.collection("posts").find(filter).toArray();
  const count = await db.collection('posts').find(filter).count((err, count) => {
    if (err) {
      console.error('Failed to count documents:', err);
    } else {
      console.log('Total count:', count);
    }
    client.close();
})
  res.status(200).send({count,posts});
}
