import { connectToDatabase } from "../../../lib/db";


export default async function handler(req, res) {
    const { db } = await connectToDatabase();
  
    if (req.method === "PUT") {
      const { id, title, content } = req.body;
      const result = await db
        .collection("posts")
        .findOneAndUpdate(
          { _id: id },
          { $set: { title, content } },
          { returnOriginal: false }
        );
      res.status(200).json(result.value);
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }