import { useParams } from 'react-router-dom';
export default function Singleip() {
  const { ip } = useParams();  // Get the 'ip' parameter from the URL

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Single IP</h1>
      <p className="mt-4">In this page show all infromation of {ip} single ip</p>
    </div>
  );
}
