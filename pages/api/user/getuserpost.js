import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {email}  = req.query;
    if (req.method === "GET") {
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find({email:email}).toArray();
  const count = await db.collection("posts").estimatedDocumentCount();
  res.status(200).send({count,posts});
} else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
