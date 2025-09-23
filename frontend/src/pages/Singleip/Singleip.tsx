import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  GlobeAltIcon,
  ComputerDesktopIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  KeyIcon,
  ServerIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function Singleip() {
  const { ip } = useParams();
  const [activePort, setActivePort] = useState<number | null>(null);

  const ports = [
    { port: 443, service: "HTTPS", protocol: "UDP", icon: LockClosedIcon },
    { port: 80, service: "HTTP", protocol: "UDP", icon: GlobeAltIcon },
    { port: 21, service: "FTP", protocol: "TCP", icon: ServerIcon },
    { port: 22, service: "SSH", protocol: "TCP", icon: KeyIcon },
  ];

  return (
    <div
      className="mx-auto p-4 flex flex-col gap-6"
      style={{
        width: "1024px",
      }}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">IP Scanning Summary</h1>
        <p className="text-gray-600 mt-1">
          Showing all information of <span className="font-semibold">{ip}</span>
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left Section - IP Info + Open Ports */}
        <aside className="flex flex-col gap-6" style={{ width: "414px" }}>
          {/* IP Information */}
          <div
            className="bg-white p-2 border shadow-md rounded-lg"
            style={{ height: "233px", borderWidth: "1px", borderRadius: "8px" }}
          >
             
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 flex items-center gap-2 font-semibold">
                    <GlobeAltIcon className="w-5 h-5 text-blue-500" /> IP Address
                  </td>
                  <td className="p-2 text-blue-600">{ip}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 flex items-center gap-2 font-semibold">
                    <ComputerDesktopIcon className="w-5 h-5 text-gray-600" /> Mac Address
                  </td>
                  <td className="p-2">aa:bb:cc:dd:ee:ff</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 flex items-center gap-2 font-semibold">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-indigo-500" /> Device Type
                  </td>
                  <td className="p-2">Laptop</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 flex items-center gap-2 font-semibold">
                    <BuildingOfficeIcon className="w-5 h-5 text-green-600" /> Vendor
                  </td>
                  <td className="p-2">HP Inc.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 flex items-center gap-2 font-semibold">
                    <ComputerDesktopIcon className="w-5 h-5 text-purple-500" /> OS
                  </td>
                  <td className="p-2">Windows 11</td>
                </tr>
                <tr>
                  <td className="p-2 flex items-center gap-2 font-semibold">
                    <ShieldCheckIcon className="w-5 h-5 text-green-600" /> Firewall
                  </td>
                  <td className="p-2 text-green-600">Active</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Open Ports */}
          <div
            className="bg-white p-4 border shadow-md rounded-lg"
            style={{ height: "270px", borderWidth: "1px", borderRadius: "8px" }}
          >
            <h2 className="font-semibold text-gray-700 text-lg mb-3 flex items-center gap-2">
              <Squares2X2Icon className="w-5 h-5 text-gray-700" /> Open Ports
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-2 border-b">Port</th>
                  <th className="p-2 border-b">Service</th>
                  <th className="p-2 border-b">Protocol</th>
                </tr>
              </thead>
              <tbody>
                {ports.map(({ port, service, protocol, icon: Icon }) => (
                  <tr
                    key={port}
                    onClick={() => setActivePort(port)}
                    className={`cursor-pointer transition ${
                      activePort === port ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-2 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" /> {port}
                    </td>
                    <td className="p-2">{service}</td>
                    <td className="p-2">{protocol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>

        {/* Right Section - Ports Details */}
        <div className="flex-1">
          <div
            className=" p-4 border-l-2 "
            style={{
              width: "377px",
              height: "614px",
              position: "absolute",
              top: "99px",
              left: "611px",
              borderLeftWidth: "2px",
              transform: "rotate(0deg)",
               
            }}
          >
  
            <h2 className="font-semibold text-gray-700 text-lg mb-3 flex items-center gap-2">
                <Squares2X2Icon className="w-5 h-5 text-gray-700" /> Ports Details
            </h2>

            <div className="space-y-3">
              {ports.map((p) => (
                <div key={p.port} className="border rounded-lg   overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                    onClick={() => setActivePort(activePort === p.port ? null : p.port)}
                    aria-expanded={activePort === p.port}
                  >
                    <div className="flex items-center gap-2">
                      {activePort === p.port ? (
                        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                      ) : (
                        <PlusIcon className="w-4 h-4 text-gray-500" />
                      )}
                      {p.port} - {p.service}
                    </div>
                    <ChevronRightIcon
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        activePort === p.port ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {activePort === p.port && (
                    <div className="p-3 text-sm text-gray-600 bg-gray-50 border-t">
                      <p>
                        <span className="font-semibold">Protocol:</span> {p.protocol}
                      </p>
                      <p className="mt-1">Details about this port...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
