import { connectToDatabase } from "../../../lib/db";




export default async function handler(req, res) {
    const {q}  = req.query;
console.log(q)
  const { db } = await connectToDatabase();
  if (req.method === "GET") {
      const title = new RegExp(`.*${q}.*`, 'gi');
  const body = new RegExp(`.*${q}.*`, 'gi');
//   const posts = await db.collection("posts").find({}).skip(parseInt(page)*10).limit(10).toArray();
  const posts = await db.collection("posts").find({title:title}).toArray();
  if(!posts.length){
      const posts = await db.collection("posts").find({body:body}).toArray();
      const count = posts.length
      return res.json({count,posts});
  }
  const count = posts.length
  res.json({count,posts});
}else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  }
