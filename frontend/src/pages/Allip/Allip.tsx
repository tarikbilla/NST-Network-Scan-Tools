import { useState } from "react";
import {
  ComputerDesktopIcon,
  WifiIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Allip() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const devices = [
    { id: 1, ip: "192.168.0.21", mac: "aa:bb:cc:dd:ee:ff", ping: "31.6ms", ttl: 64, iface: "wlp1s0" },
    { id: 2, ip: "192.168.0.34", mac: "aa:bb:cc:dd:ee:ff", ping: "32.6ms", ttl: 128, iface: "wlp1s0" },
    { id: 3, ip: "192.168.0.42", mac: "aa:bb:cc:dd:ee:ff", ping: "55.6ms", ttl: 128, iface: "wlp1s0" },
    { id: 4, ip: "192.168.0.53", mac: "aa:bb:cc:dd:ee:ff", ping: "42.6ms", ttl: 64, iface: "wlp1s0" },
    { id: 5, ip: "192.168.0.55", mac: "aa:bb:cc:dd:ee:ff", ping: "18.6ms", ttl: 64, iface: "wlp1s0" },
    { id: 6, ip: "192.168.0.58", mac: "aa:bb:cc:dd:ee:ff", ping: "19.8ms", ttl: 128, iface: "wlp1s0" },
    { id: 7, ip: "192.168.0.112", mac: "aa:bb:cc:dd:ee:ff", ping: "12.6ms", ttl: 64, iface: "wlp1s0" },
    { id: 8, ip: "192.168.0.172", mac: "aa:bb:cc:dd:ee:ff", ping: "12.6ms", ttl: 128, iface: "wlp1s0" },
    { id: 9, ip: "192.168.0.111", mac: "aa:bb:cc:dd:ee:ff", ping: "11.6ms", ttl: 64, iface: "wlp1s0" },
  ];

  const filteredDevices = devices.filter(
    (d) =>
      d.ip.includes(search) ||
      d.mac.includes(search) ||
      d.iface.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDevices.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentDevices = filteredDevices.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-4">
     {/* Steps Section */}
<div className="w-[938px] h-[125px] p-4 border border-blue-100 rounded-lg mb-10 flex items-center justify-center gap-x-12">
  {/* Step 1: Your Device */}
  <div className="flex flex-col items-center text-gray-700">
    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
      <ComputerDesktopIcon className="w-7 h-7 text-blue-600" />
    </div>
    <p className="mt-2 text-sm font-semibold">Your Device</p>
    <p className="text-xs text-gray-500">172.10.20.123</p>
  </div>

  {/* Connector */}
  <div className="flex items-center pb-8">
    <div className="w-24 border-t-2 border-blue-400"></div>
    <ArrowRightIcon className="w-5 h-5 text-blue-500 -ml-1" />
  </div>

  {/* Step 2: Access Point */}
  <div className="flex flex-col items-center text-gray-700">
    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
      <WifiIcon className="w-7 h-7 text-green-600" />
    </div>
    <p className="mt-2 text-sm font-semibold">Access Point</p>
    <p className="text-xs text-gray-500">172.10.0.1</p>
  </div>

  {/* Connector */}
  <div className="flex items-center pb-8">
    <div className="w-24 border-t-2  border-blue-400"></div>
    <ArrowRightIcon className="w-5 h-5 text-blue-500 -ml-1" />
  </div>

  {/* Step 3: Searching */}
  <div className="flex flex-col items-center text-gray-700">
    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
      <MagnifyingGlassIcon className="w-7 h-7 text-yellow-600" />
    </div>
    <p className="mt-2 text-sm font-semibold">Searching</p>
  </div>
</div>


      {/* Devices Table Section */}
      <div className="relative w-[944px] h-[441px] p-4 border border-blue-100 rounded-lg shadow-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">All Connected Devices</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by IP, MAC, or Interface..."
            className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto h-[320px]">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-sm">
              <tr>
                <th className="px-4 py-3">SL</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">MAC Address</th>
                <th className="px-4 py-3">Ping Time</th>
                <th className="px-4 py-3">TTL</th>
                <th className="px-4 py-3">Interface</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentDevices.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-2 font-medium text-gray-700">{row.id}</td>
                  <td className="px-4 py-2">{row.ip}</td>
                  <td className="px-4 py-2">{row.mac}</td>
                  <td className="px-4 py-2">{row.ping}</td>
                  <td className="px-4 py-2">{row.ttl}</td>
                  <td className="px-4 py-2">{row.iface}</td>
                  <td className="px-4 py-2">
                    <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      Scan This IP
                    </button>
                  </td>
                </tr>
              ))}
              {currentDevices.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No devices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredDevices.length)} of {filteredDevices.length} entries
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
