import { connectToDatabase } from "../../../lib/db";


export default async function handler(req, res) {
    const { db } = await connectToDatabase();
  
    if (req.method === "PUT") {
      const body = req.body;
      console.log(body)
      const result = await db
        .collection("posts")
        .updateOne(
          { postId: body.postId },
          { $set: body },
          { upsert: true }
        );
      res.status(200).json(result);
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }