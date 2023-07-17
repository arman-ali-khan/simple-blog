import { connectToDatabase } from "../../../lib/db";


export default async function handler(req, res) {
    const { db } = await connectToDatabase();
  
    if (req.method === "PUT") {
      const data = req.body;
      console.log(data);
      const result = await db
        .collection("users")
        .updateOne(
          { email : data.email },
          { $set: data },
          { upsert: true }
        );
      res.status(200).send(result);
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }