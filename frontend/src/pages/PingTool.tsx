import React, { useState } from "react";
import { ServerStackIcon } from "@heroicons/react/24/outline"; // <— heroicon import

export default function PingTool() {
  const [ip, setIp] = useState("");
  const [quantity, setQuantity] = useState(4);

  // Demo ping data
  const pingResults = [
    { seq: 1, ip: "192.168.11.12", ttl: 64, time: "35.4 ms" },
    { seq: 2, ip: "192.168.11.12", ttl: 64, time: "31.1 ms" },
    { seq: 3, ip: "192.168.11.12", ttl: 128, time: "31.4 ms" },
    { seq: 4, ip: "192.168.11.12", ttl: 64, time: "30.31 ms" },
  ];

  return (
    <div className="h-[598px] w-full flex flex-col items-center py-12">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Ping Tools</h1>
      <p className="text-gray-600 mb-8 text-center">
        Enter the IP address and sequence number to retrieve ping information.
      </p>

      {/* Input fields with labels */}
      <div className="flex items-end gap-4 mb-10">
        <div className="flex flex-col">
          <label htmlFor="ip" className="mb-1 text-sm font-medium text-gray-700">
            Enter IP Address
          </label>
          <input
            id="ip"
            type="text"
            placeholder="192.168.0.1"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-60 outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="quantity"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="4"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-20 outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button className="self-end bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
          Start Ping
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white w-[650px] rounded-lg border border-gray-200 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <ServerStackIcon className="h-5 w-5 text-gray-800" />
          <h2 className="text-lg font-semibold text-gray-800">Ping Details</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="px-6 py-3 text-sm font-medium">ICMP Seq</th>
              <th className="px-6 py-3 text-sm font-medium">IP</th>
              <th className="px-6 py-3 text-sm font-medium">TTL</th>
              <th className="px-6 py-3 text-sm font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {pingResults.map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 text-gray-700">{row.seq}</td>
                <td className="px-6 py-3 text-gray-700">{row.ip}</td>
                <td className="px-6 py-3 text-gray-700">{row.ttl}</td>
                <td className="px-6 py-3 text-gray-700">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
