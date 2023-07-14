import { connectToDatabase } from "../../../utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "DELETE") {
    const { id } = req.body;
    const result = await db.collection("posts").deleteOne({ _id: id });
    res.status(200).json({ success: result.deletedCount > 0 });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
