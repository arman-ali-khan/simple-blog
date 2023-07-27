import axios from "axios";
import { useState } from "react";
import Blog from "../Home/Blogs/Blog";
import Categories from "../Home/Categories/Categories";

const Search = () => {

  // const search query
  const [searchQuery,setSearchQuery] = useState('')

    // get all search result
    const [searches,setSearches] = useState({})

    // search data 
    const searchData = searches.posts

    // search loading
    const [loading,setLoading] = useState(false)
    // fetch
  const handleSearch = () =>{
    setLoading(true)
      axios.get(`/api/search?q=${searchQuery}`)
      .then(res=>{
        setSearches(res.data)
        setLoading(false)
      }).catch(err=>{
        setLoading(false)
      })
    }
console.log(searchData)
    return (
       <div className="md:flex md:gap-2">
         <div className="md:w-9/12  md:px-6">
            <div className="mb-3 md:px-6">
  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
    <input
    onChange={(e)=>setSearchQuery(e.target.value)}
      type="search"
      className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6]  outline-none transition duration-200 ease-in-out focus:z-[3]  focus: focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none  "
      placeholder="Search"
      aria-label="Search"
      aria-describedby="button-addon3" />

    <button onClick={()=>handleSearch()}
      className="relative z-[2] rounded-r border-2  px-6 py-2 text-xs font-medium uppercase  transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
      type="button"
      id="button-addon3"
      data-te-ripple-init>
      {!loading? 'Search':<div className="animate-spin border-2 border-dashed h-4 mx-4 w-4 rounded-full"></div>}
    </button>
  </div>
</div>
<div>
   {
    searchData?.length ? 
      searchData.map(post=> <Blog post={post} />)
     : 'No result'
   }
</div>
        </div>
        <div className="md:w-3/12">
        <Categories />
        </div>
       </div>
    );
};

export default Search;