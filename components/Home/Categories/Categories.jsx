import Link from "next/link";

const Categories = () => {
    return (
             <div className="bg-base-100">
    <h2 className="bg-base-200 px-4 py-2 rounded">Catgegories</h2>
    <div className="">
        <ul>
            <li className="border-b flex items-center">
                <Link className="hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500 w-full flex px-3 py-2" href="/category/cats">Cats </Link> <span>(10)</span>
            </li>
        </ul>
    </div>
    </div>
    );
};

export default Categories;