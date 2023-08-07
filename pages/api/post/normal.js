import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {postId}  = req.query;

  const { db } = await connectToDatabase();
  const filter = { postId: postId } 
  const posts = await db.collection("posts").findOne(filter);
      res.status(200).send(posts);
}
