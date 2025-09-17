import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'

const navLink =
  "text-sm transition hover:text-black/80 text-gray-700 data-[active=true]:text-[#3563E9] data-[active=true]:font-semibold";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(prev => (prev === dropdown ? null : dropdown)); // Close if the same dropdown is clicked again
  };

  return (
    <header className="bg-white rounded-[10px]">
      <div className="mx-auto flex h-16 w-full max-w-[1024px] items-center justify-between px-5">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="NST Logo" className="h-8" />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
          {/* File Dropdown */}
          <div className="relative">
            <NavLink
              to="#"
              className={({ isActive }) => `${navLink}`}
              onClick={() => handleDropdownToggle("file")}
            >
              File
            </NavLink>
            {openDropdown === "file" && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/new">New</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/export">Export</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/import">Import</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="#">Exit</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Scan Dropdown */}
          <div className="relative">
            <NavLink
              to="#"
              className={({ isActive }) => `${navLink}`}
              onClick={() => handleDropdownToggle("scan")}
            >
              Scan
            </NavLink>
            {openDropdown === "scan" && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/quick-scan">Quick Scan</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/new-scan">New Scan</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/stop-scan">Stop Running Scan</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Analyze Dropdown */}
          <div className="relative">
            <NavLink
              to="#"
              className={({ isActive }) => `${navLink}`}
              onClick={() => handleDropdownToggle("analyze")}
            >
              Analyze
            </NavLink>
            {openDropdown === "analyze" && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md border">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/scan-results-summary">Scan Results Summary</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/scan-history">Scan History</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="relative">
            <NavLink
              to="#"
              className={({ isActive }) => `${navLink}`}
              onClick={() => handleDropdownToggle("tools")}
            >
              Tools
            </NavLink>
            {openDropdown === "tools" && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/ping-tool">Ping Tool</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/traceroute">Traceroute</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/compare-ips">Compare IPs</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/ports-scan">Ports Scan only</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Help Dropdown */}
          <div className="relative">
            <NavLink
              to="#"
              className={({ isActive }) => `${navLink}`}
              onClick={() => handleDropdownToggle("help")}
            >
              Help
            </NavLink>
            {openDropdown === "help" && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/documentation">Documentation</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/report-issue">Report an Issue</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/version-info">Version Info</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </nav>
      </div>
      <div className="h-px w-full border-t border-black/10" />
    </header>
  );
}
