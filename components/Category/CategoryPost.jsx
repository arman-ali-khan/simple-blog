import Blog from "../Home/Blogs/Blog";
import Categories from "../Home/Categories/Categories";

const CategoryPost = () => {
    return (
        <div className="md:flex justify-between w-full">
              <div className="flex md:w-2/3 w-full  flex-wrap flex-row items-center justify-start">
        
        <div className="md:p-3 p-1 w-full">
        <div className="bg-base-200 w-full px-4 py-2 ">
        <h2>Category Post</h2>
        </div>
        <Blog />
        </div>
      </div>
      <div className="md:w-1/3 w-full md:p-3 p-1  h-full">
   <Categories />
      </div>
        </div>
    );
};

export default CategoryPost;