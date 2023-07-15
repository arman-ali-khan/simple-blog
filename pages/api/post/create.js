import { connectToDatabase } from "@/lib/db";



export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    // const result = await db.collection("posts").insertOne(data);
    // res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
