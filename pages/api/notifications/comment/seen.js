import { connectToDatabase } from "../../../../lib/db";





export default async function handler(req, res) {
    const {page,email}  = req.query;

  const { db } = await connectToDatabase();
  // const filter = { tags: { $elemMatch: { label: tag } } }
  const notifications = await db.collection("commentNotifications").find({author:email,seen:false}).toArray();
  res.status(200).send(notifications);
}
