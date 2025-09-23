import React from "react";
import {
  GlobeAltIcon,
  CpuChipIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  WindowIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function CompareIps() {
  return (
    <div className="p-8 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl font-semibold font-poppins text-center">
        Compare IPs
      </h1>
      <p className="mt-2 text-gray-600 text-center">
        Enter two IP addresses to compare information.
      </p>

      {/* Input Section */}
      <div className="flex mt-8 space-x-2">
        <input
          type="text"
          placeholder="192.168.0.1"
          className="border rounded-md px-4 py-3 w-64"
        />
        <input
          type="text"
          placeholder="192.168.0.2"
          className="border rounded-md px-4 py-3 w-64"
        />
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
          Compare
        </button>
      </div>

      {/* Cards Section */}
      <div className="flex mt-10 space-x-6">
        {/* Card 1 */}
        <div className="w-[466px] h-[309px] border rounded-lg overflow-hidden">
          <h2 className="bg-gray-100 text-center font-inter font-bold text-sm py-2">
            IP - 1
          </h2>
          <ul className="text-sm text-gray-700 divide-y">
            {[
              {
                icon: <GlobeAltIcon className="w-5 h-5" />,
                label: "IP Address 1:",
                value: "192.168.0.1",
              },
              {
                icon: <CpuChipIcon className="w-5 h-5" />,
                label: "Mac Address:",
                value: "aa:bb:cc:dd:ee:ff",
              },
              {
                icon: <ComputerDesktopIcon className="w-5 h-5" />,
                label: "Device Type:",
                value: "Laptop",
              },
              {
                icon: <BuildingOffice2Icon className="w-5 h-5" />,
                label: "Vendor:",
                value: "HP Inc.",
              },
              {
                icon: <WindowIcon className="w-5 h-5" />,
                label: "OS:",
                value: "Windows 11",
              },
              {
                icon: <ShieldCheckIcon className="w-5 h-5" />,
                label: "Firewall:",
                value: <span className="text-green-600">Active</span>,
              },
              {
                icon: <Squares2X2Icon className="w-5 h-5" />,
                label: "Open Ports:",
                value: "21 (FTP), 80 (HTTP), 22 (SSH), 445 (HTTPS)",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-1 px-2 py-2"
              >
                {item.icon}
                <div className="grid grid-cols-[130px_1fr] w-full">
                  <span className="font-semibold">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2 */}
        <div className="w-[466px] h-[309px] border rounded-lg overflow-hidden">
          <h2 className="bg-gray-100 text-center font-inter font-bold text-sm py-2">
            IP - 2
          </h2>
          <ul className="text-sm text-gray-700 divide-y">
            {[
              {
                icon: <GlobeAltIcon className="w-5 h-5" />,
                label: "IP Address 2:",
                value: "192.168.0.2",
              },
              {
                icon: <CpuChipIcon className="w-5 h-5" />,
                label: "Mac Address:",
                value: "aa:bb:cc:dd:ee:ff",
              },
              {
                icon: <ComputerDesktopIcon className="w-5 h-5" />,
                label: "Device Type:",
                value: "Camera",
              },
              {
                icon: <BuildingOffice2Icon className="w-5 h-5" />,
                label: "Vendor:",
                value: "TP-Link",
              },
              {
                icon: <WindowIcon className="w-5 h-5" />,
                label: "OS:",
                value: "Linux OS",
              },
              {
                icon: <ShieldCheckIcon className="w-5 h-5" />,
                label: "Firewall:",
                value: <span className="text-green-600">Active</span>,
              },
              {
                icon: <Squares2X2Icon className="w-5 h-5" />,
                label: "Open Ports:",
                value: "554 (RTSP), 22 (SSH), 445 (HTTPS)",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 px-4 py-2"
              >
                {item.icon}
                <div className="grid grid-cols-[130px_1fr] w-full">
                  <span className="font-semibold">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
