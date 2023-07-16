import { Inter } from 'next/font/google'
import Blogs from '../components/Home/Blogs/Blogs'
import Featured from '../components/Home/Hero/Featured'
import CreatePost from '../components/Shared/CreatePost/CreatePost'
import Layout from '../layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  return (
    <Layout title={'Home'}>
      <Featured />
      <Blogs />
      <CreatePost />
    </Layout>
  )
}
