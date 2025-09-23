import React, { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState("14px");
  const [timeZone, setTimeZone] = useState("Berlin (GMT+2)");
  const [fontFamily, setFontFamily] = useState("Poppins");

  return (
    <div className="p-12 font-[Poppins]">
      {/* Title */}
      <h1
        className="font-semibold text-[24px]"
        style={{
          lineHeight: "62px",
          letterSpacing: "0px",
        }}
      >
        Settings
      </h1>

      {/* Time Zone */}
      <div className="mt-6 flex items-center gap-4">
        <label className="w-32 text-[14px] font-normal">Time Zone:</label>
        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className="border rounded-md px-3 py-2 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>Berlin (GMT+2)</option>
          <option>London (GMT+1)</option>
          <option>New York (GMT-4)</option>
          <option>Dhaka (GMT+6)</option>
        </select>
      </div>

      {/* Dark Mode */}
      <div className="mt-6 flex items-center gap-4">
        <label className="w-32 text-[14px] font-normal">Dark Mode:</label>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            darkMode ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              darkMode ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      {/* Font Size */}
      <div className="mt-6 flex items-center gap-4">
        <label className="w-32 text-[14px] font-normal">Font Size:</label>
        <input
          type="text"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="border rounded-md px-3 py-2 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-24"
        />
      </div>

      {/* Font Family */}
      <div className="mt-6 flex items-center gap-4">
        <label className="w-32 text-[14px] font-normal">Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border rounded-md px-3 py-2 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>Poppins</option>
          <option>Roboto</option>
          <option>Inter</option>
          <option>Arial</option>
        </select>
      </div>
    </div>
  );
}
