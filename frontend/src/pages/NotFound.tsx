import { Link, Links } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
  
      <main className="flex-1 px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center">404 Page Not Found!</h1>
        <p className="mt-2 text-slate-300 text-center">Back to <Link className="text-blue-500" to="/">Scan Page</Link> </p>
      </main>
     
    </div>
  );
}
