import React, { useState } from "react";

export default function Traceroute() {
  const [ip, setIp] = useState("");
const [results, setResults] = useState([
  "traceroute to google.com (172.217.16.206), 30 hops max, 60 byte packets",
  "* * *",
  "viprinet-lan-fb-b5.its.thm.de (172.31.2.33)  11.429 ms  11.354 ms  12.364 ms",
  "trans-wlan-clients-fb-viprinet-v259.its.thm.de (172.31.0.6)  34.326 ms  34.257 ms  34.845 ms",
  "trans-vfw-fb-byod-v259.its.thm.de (172.31.0.1)  35.899 ms  37.421 ms  35.748 ms",
  "fb-nat-212-201-30-1.nat.thm.de (212.201.30.1)  37.271 ms  35.607 ms  35.530 ms",
  "r02-fb-intern-v160.its.thm.de (212.201.25.1)  40.760 ms  34.407 ms  34.180 ms",
  "cr-han3-pe11041.x-win.dfn.de (188.1.246.73)  35.808 ms  38.879 ms  38.695 ms",
  "de-fra1-core1.google.com (216.239.48.21)  45.231 ms  44.987 ms  45.112 ms",
  "* * *",
  "ge-1-1-0.edge1.fra.de (80.81.192.1)  48.452 ms  48.321 ms  48.674 ms",
  "ae5.edge2.fra.de (80.81.192.5)  50.123 ms  50.456 ms  50.789 ms",
  "core1.lon.uk (193.120.160.1)  52.231 ms  51.987 ms  52.456 ms",
  "core2.lon.uk (193.120.160.5)  54.321 ms  53.876 ms  54.123 ms",
  "uk-gw1.google.com (172.217.12.78)  56.432 ms  56.198 ms  56.765 ms",
  "* * *",
  "us-east1.google.com (209.85.255.101)  98.321 ms  97.876 ms  98.123 ms",
  "us-east2.google.com (209.85.255.102)  100.432 ms  100.198 ms  100.765 ms",
  "final-destination.google.com (172.217.16.206)  102.123 ms  101.876 ms  102.432 ms",
]);

  const [loading, setLoading] = useState(false);

  const handleTraceroute = () => {
    setLoading(true);
    setTimeout(() => {
      setResults((prev) => [
        ...prev,
        "new-hop.example.com (203.0.113.5)  52.123 ms  51.987 ms  52.456 ms",
        "new-hop2.example.com (203.0.113.6)  54.321 ms  53.876 ms  54.123 ms",
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full flex justify-center p-2 bg-gray-50   font-inter">
      <div className="w-full  p-12">
        {/* Title */}
        <h1 className="text-[32px] font-semibold text-center leading-[38px]">
          Traceroute Tool
        </h1>
        <p className="text-[16px] font-normal text-center text-gray-600 mt-2 leading-[20px]">
          Enter the IP address to retrieve traceroute information.
        </p>

        {/* Search Section */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="ip"
              className="block text-gray-700 mb-2 font-medium"
            >
              IP Address
            </label>
            <div className="flex">
              <input
                id="ip"
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.0.1"
                className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleTraceroute}
                className="bg-blue-500 text-white w-[140px] h-[44px] rounded-r-md hover:bg-blue-600 transition flex items-center justify-center font-medium"
              >
                {loading ? "Loading..." : "Traceroute"}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
          <div className="mt-8 h-[400px] overflow-y-auto pr-2 pb-8 
                    scrollbar-thin 
                    scrollbar-thumb-blue-500 
                    scrollbar-track-gray-200 
                    scrollbar-thumb-rounded-full 
                    scrollbar-track-rounded-full 
                    hover:scrollbar-thumb-blue-600 
                    transition-colors duration-300"
                >
                  {results.map((line, idx) => (
                    <div key={idx} className="relative flex items-start space-x-4 py-4">
                      {/* Circle with index */}
                      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-blue-400 text-sm font-semibold text-blue-600 bg-blue-50 z-10 relative">
                        {idx + 1}
                        {/* Vertical line for all except last */}
                        {idx !== results.length - 1 && (
                          <span className="absolute top-full left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-300"></span>
                        )}
                      </span>
                      <p className="text-gray-800 text-[16px] font-normal break-words leading-[20px]">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
            </div>
    </div>
  );
}
