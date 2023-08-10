// import JoditEditor from 'jodit-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
// const JoditEditor =
//   typeof window === "object" ? require("jodit-react") : () => false;
  const JoditEditor = dynamic(import("jodit-react"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
  });
const index = () => {

	const editor = useRef(null)
	const [content,setContent] = useState('')
  // error handling
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(content)
	return (
		(  mounted && <div>
			<JoditEditor ref={editor} value={content} onChange={(e)=>setContent(e)} />
		</div>)
	);
};

export default index;