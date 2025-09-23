import React, { useState } from 'react';
import {
  Squares2X2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import {
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/solid';

export default function PortsScan() {
  const [ipAddress, setIpAddress] = useState('');
  const [openPort, setOpenPort] = useState(null);

  const handleScan = () => {
    console.log('Scanning IP:', ipAddress);
  };

  const togglePort = (port) => {
    setOpenPort(openPort === port ? null : port);
  };

  const ports = [
    { port: 443, label: 'HTTPS' },
    { port: 80, label: 'HTTP' },
    { port: 21, label: 'FTP' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-300 rounded-md p-6 mb-6">
        <h1 className="text-2xl font-semibold font-poppins mb-2">Ports Scan Only</h1>
        <p className="text-gray-600">Enter two IP addresses to retrieve ports information.</p>

        {/* Input Label */}
        <label
          htmlFor="ipAddress"
          className="text-gray-800 mb-1 mt-4"
          style={{
            fontFamily: 'Manrope',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '14px',
            letterSpacing: '0px',
            width: '252px',
            height: '19px',
            opacity: 1,
            display: 'inline-block',
          }}
        >
          Enter IP Address
        </label>

        <div className="flex">
          <input
            id="ipAddress"
            type="text"
            className="border border-gray-300 rounded-l-md px-4 py-2 w-64"
            placeholder="192.168.0.1"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button
            onClick={handleScan}
            className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Scan
          </button>
        </div>
      </div>

      {/* Ports Details */}
      <div className="bg-white border border-gray-300 rounded-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Squares2X2Icon className="h-5 w-5 text-gray-600" />
          Ports Details
        </h2>

        {ports.map(({ port, label }) => (
          <div key={port} className="border rounded-md mb-4">
            <button
              onClick={() => togglePort(port)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
            >
              {/* Left: toggle icon + label */}
              <div className="flex items-center space-x-3">
                {openPort === port ? (
                  <MinusIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-gray-600" />
                )}
                <span className="font-medium">{port} - {label}</span>
              </div>

              {/* Right: Chevron */}
              {openPort === port ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {/* Expanded content */}
            {openPort === port && (
              <div className="bg-white px-4 py-3 text-gray-600 border-t rounded-b-md">
                Details for port {port} ({label}) go here...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
