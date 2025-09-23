import React from "react";
import { ComputerDesktopIcon, WifiIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Export() {
  return (
    <div className="flex flex-col items-center justify-center relative h-[598px]  ">
      {/* Title */}
      <h1
        className="font-[Poppins] font-semibold text-[32px] leading-[62px] text-center absolute"
        style={{
          width: "636px",
          height: "89px",
          top: "95px",
          left: "194px",
          letterSpacing: "0px",
          opacity: 1,
        }}
      >
        Export Data
      </h1>

      {/* Subtitle */}
      <p
        className="font-[Poppins] font-normal text-[16px] leading-[30px] text-center text-gray-600 absolute"
        style={{
          width: "636px",
          top: "160px",
          left: "194px",
          letterSpacing: "0px",
        }}
      >
        Click the Export button to download the scan data in .JSON format.
      </p>

      {/* Export Data Box */}
      <div
        className="absolute bg-white shadow-lg rounded-lg p-6"
        style={{
          width: "371px",
          height: "331px",
          left: "342px",
          top: "235px",
        }}
      >
        <h2 className="text-center font-semibold text-gray-800 mb-6">
          Export Data Summary
        </h2>

        {/* IP Address */}
        <div className="flex items-center mb-4">
          <ComputerDesktopIcon className="h-5 w-5 text-gray-600 mr-2" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">IP Address:</span> 172.10.20.123
          </p>
        </div>

        {/* MAC Address */}
        <div className="flex items-center mb-4">
          <WifiIcon className="h-5 w-5 text-gray-600 mr-2" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Mac Address:</span> aabb:cc:dd:ee:ff
          </p>
        </div>

        {/* Timestamp */}
        <div className="flex items-center mb-6">
          <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">TimeStamp:</span> 16/09/2025 14:18:22
          </p>
        </div>

        {/* Dropdown */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Data Type
        </label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
          defaultValue="JSON"
        >
          <option>JSON</option>
          <option>CSV</option>
          <option>XML</option>
        </select>

        {/* Button */}
        <button className="w-full bg-gray-700 text-white font-medium py-2 rounded-md hover:bg-gray-800 transition">
          Export Data
        </button>
      </div>
    </div>
  );
}
