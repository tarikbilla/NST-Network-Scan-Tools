import React from "react";
import logo from "../assets/logo.png"; // adjust path if needed

export default function About() {
  return (
    <div className="flex flex-col items-center p-8">
      {/* Title */}
      <h1
        className="text-center"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "62px",
          letterSpacing: "0px",
        }}
      >
        About NST
      </h1>

      {/* Card */}
      <div
        className="bg-white border rounded-lg shadow-md p-6 mt-4"
        style={{
          width: "550px",
          height: "391px",
        }}
      >
        {/* Header with Logo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <img src={logo} alt="NST Logo" className="w-full h-8" />
            

          </div>

          {/* Application Version */}
          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "100%",
              letterSpacing: "0px",
            }}
            className="text-gray-600 mb-4"
          >
            Application Version: 1.0.0
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 text-justify">
          NST (Network Scan Tools) is a lightweight, fast, and user-friendly
          desktop application designed for efficient network diagnostics,
          scanning, and analysis. Whether you're an IT professional or
          cybersecurity student, NST provides the tools you need to monitor and
          assess your network with ease.
        </p>
        <p className="text-gray-700 text-sm mb-6 text-justify">
          NST is open source and community-driven. We believe in empowering
          users with simple yet powerful tools that get the job done securely
          and transparently.
        </p>

        {/* Buttons */}
<div className="flex justify-center gap-4">
  <a
    href="#"
    className="text-white transition"
    style={{
      width: "154px",
      height: "34px",
      borderRadius: "4px",
      padding: "0 12px 6px 12px",
      background: "#64748B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 1,
    }}
  >
    GitHub
  </a>
  <a
    href="#"
    className="text-white transition"
    style={{
      width: "154px",
      height: "35px",
      borderRadius: "4px",
      padding: "0 12px 6px 12px",
      background: "#80BA24",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 1,
    }}
  >
    Documentation
  </a>
  <a
    href="#"
    className="text-white transition"
    style={{
      width: "154px",
      height: "34px",
      borderRadius: "4px",
      padding: "0 12px 6px 12px",
      background: "#4094F7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 1,
    }}
  >
    Website
  </a>
</div>

      </div>
    </div>
  );
}
