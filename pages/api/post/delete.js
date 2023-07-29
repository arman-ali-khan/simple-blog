import { connectToDatabase } from "../../../lib/db";



export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "DELETE") {
    const { id } = req.query;
    const result = await db.collection("posts").deleteOne({ postId: id });
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
