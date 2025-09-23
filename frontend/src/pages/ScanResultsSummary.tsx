import React, { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  GlobeAltIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon,
  ServerStackIcon,
  ClockIcon,
  CpuChipIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function ScanResultsSummary() {
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  const results = [
    {
      timestamp: "21/07/2025 10:45:12",
      ip: "192.168.11.21",
      mac: "aa:bb:cc:dd:ee:ff",
      device: "Laptop",
      vendor: "HP Inc.",
      os: "Windows 11",
      firewall: "Active",
      firewallColor: "bg-green-100 text-green-800",
      ports: "21 (FTP), 80 (HTTP), 22 (SSH), 445 (HTTPS)",
    },
    {
      timestamp: "21/07/2025 10:50:01",
      ip: "192.168.11.22",
      mac: "11:22:33:44:55:66",
      device: "Desktop",
      vendor: "Dell",
      os: "Windows 10",
      firewall: "Inactive",
      firewallColor: "bg-red-100 text-red-800",
      ports: "80 (HTTP), 443 (HTTPS)",
    },
    {
      timestamp: "21/07/2025 11:05:45",
      ip: "192.168.11.23",
      mac: "77:88:99:aa:bb:cc",
      device: "Tablet",
      vendor: "Samsung",
      os: "Android 12",
      firewall: "Active",
      firewallColor: "bg-green-100 text-green-800",
      ports: "443 (HTTPS), 80 (HTTP)",
    },
    {
      timestamp: "21/07/2025 11:20:33",
      ip: "192.168.11.24",
      mac: "dd:ee:ff:00:11:22",
      device: "Phone",
      vendor: "Apple",
      os: "iOS 17",
      firewall: "Inactive",
      firewallColor: "bg-red-100 text-red-800",
      ports: "443 (HTTPS), 5223 (APNs)",
    },
  ];

  const renderCard = (result: any, index: number) => {
    const rows = [
      { label: "Time", value: result.timestamp, icon: <ClockIcon className="h-4 w-4 text-gray-500" /> },
      { label: "IP", value: result.ip, icon: <GlobeAltIcon className="h-4 w-4 text-gray-500" /> },
      { label: "MAC", value: result.mac, icon: <CpuChipIcon className="h-4 w-4 text-gray-500" /> },
      { label: "Device", value: result.device, icon: <ComputerDesktopIcon className="h-4 w-4 text-gray-500" /> },
      { label: "Vendor", value: result.vendor, icon: <ServerStackIcon className="h-4 w-4 text-gray-500" /> },
      { label: "OS", value: result.os, icon: <ServerStackIcon className="h-4 w-4 text-gray-500" /> },
      {
        label: "Firewall",
        value: (
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${result.firewallColor}`}>
            {result.firewall}
          </span>
        ),
        icon: <ShieldCheckIcon className="h-4 w-4 text-gray-500" />,
      },
      { label: "Ports", value: result.ports, icon: <Squares2X2Icon className="h-4 w-4 text-gray-500" /> },
    ];

    return (
      <div key={index} className="relative   border border-gray-300 rounded-lg   p-3 mb-4">
        {/* Action Menu */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setMenuOpenIndex(menuOpenIndex === index ? null : index)}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          >
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-700" />
          </button>
          {menuOpenIndex === index && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button className="w-full text-left px-4 py-1 text-sm hover:bg-gray-100">Scan Again This IP</button>
              <button className="w-full text-left px-4 py-1 text-sm text-red-600 hover:bg-gray-100">Delete Data</button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-1.5">
          {rows.map((row, i) => (
            <div key={i} className="flex justify-start items-center border-b border-white-200 last:border-none py-1">
              <div className="flex items-center space-x-2 text-gray-700 text-sm font-medium w-[120px]">
                {row.icon}
                <span>{row.label}</span>
              </div>
              <div className="text-gray-900 text-sm font-semibold">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="font-poppins p-4 bg-white-50 flex justify-center">
      <div className="w-[919px] h-[620px] mb-4 relative">
        <h1
          className="mb-3 text-gray-900"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "62px",
            letterSpacing: "0px",
          }}
        >
          Scan Result Summary
        </h1>

        {/* Scrollable Cards */}
        <div className="flex flex-col h-[568px] overflow-y-auto pr-4 scrollbar-hide">
          {results.map((result, index) => renderCard(result, index))}
        </div>
      </div>
    </div>
  );
}
