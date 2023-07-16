import { connectToDatabase } from "@/lib/db";




export default async function handler(req, res) {
    const {postId}  = req.query;

  const { db } = await connectToDatabase();
  const filter = { postId: postId } 
  // view update
  const posts = await db.collection("posts").findOne(filter);
  // post view
  const view = parseInt(posts.view)

  const option = {upsert: true}
  const updateData = { $set: { view: view+1 } }
  const update = await db.collection("posts").updateOne(filter,updateData,option)

    console.log(view+1,update);

    if(update.acknowledged){
      res.status(200).send(posts);
    }
}
