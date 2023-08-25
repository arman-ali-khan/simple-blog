import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
const Dashboard = () => {
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

    // get all post
    const [posts,setPosts] = useState({})

    useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts`)
    .then(res=>{
        setPosts(res.data)
    })
    }, []);
    // get all popular
    const [popular,setPopular] = useState([])

    useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/popular`)
    .then(res=>{
        setPopular(res.data)
    })
    }, []);

    const postdata = posts?.posts
    return (
        <div className='my-2 md:flex justify-between'>
            
             <div className='my-2 w-full'>
             <div className='flex justify-center border-b border-blue-500 py-1 w-1/2 md:my-6'>
    <h2 className='font-bold'>Post Views</h2>
  </div>
             <BarChart width={400} height={300} data={postdata}>
    <XAxis dataKey="id" stroke="#8884d8" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="view" fill="#8884d8" barSize={30} />
  </BarChart>

             </div>
             <div className='w-full'>
             <div className='flex justify-center border-b border-blue-500 py-1 w-1/2 md:my-6'>
    <h2 className='font-bold'>Popular Posts</h2>
  </div>
             <BarChart width={400} height={300} data={popular}>
    <XAxis dataKey="id" stroke="#8884d8" />
    
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="view" fill="#8884d8" barSize={30} />
  </BarChart>

             </div>
        </div>
    );
};

export default Dashboard;