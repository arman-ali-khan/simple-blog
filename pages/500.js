// pages/500.js
export default function Custom500() {
    return <div className="flex justify-center items-center h-screen text-center">
       <div>
       <h1 className="text-2xl font-bold">500 - Server-side error occurred</h1>
        <a className="inline-block px-3 py-2 rounded text-white font-bold bg-blue-600" href="/">Back to home</a>
       </div>
    </div>;
  }