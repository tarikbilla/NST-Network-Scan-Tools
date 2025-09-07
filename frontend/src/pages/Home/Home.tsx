import { useState } from "react";
import { MdWifi, MdComputer, MdRouter } from "react-icons/md";

export default function Home() {
  const [ip, setIp] = useState("");

  const onScanNow = () => alert("Scanning current network…");
  const onScanIp = () => alert(`Scanning IP: ${ip || "192.168.0.1"}`);

  return (
    <>
      {/* Everything below is positioned inside the global card */}
      {/* Welcome */}
      <section className="absolute left-1/2 top-[95px] w-[636px] -translate-x-1/2 text-center">
        <h2 className="leading-[62px] text-[32px] font-semibold tracking-[-2px] text-[#090914]">
          Welcome To NST
        </h2>
        <p className="mt-2 text-[16px] leading-[30px] text-[#52525B]">
          Explore advanced tools for network security and analysis.
        </p>
      </section>

      {/* Network Details Card */}
      <section className="absolute left-[326px] top-[213px] h-[284px] w-[371.3px] rounded-[10px] border border-[#007AFF1A] bg-[#14A2ED0F] p-6 shadow-md text-center">
        <h3 className="mb-4 text-[16px] font-semibold text-black">Your Network Details</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MdWifi className="text-gray-700 text-[20px]" />
            <p className="text-sm font-medium">Connected Network: <span className="ml-1">Edurom</span></p>
          </div>

          <div className="flex items-center gap-2">
            <MdComputer className="text-gray-700 text-[20px]" />
            <p className="text-sm font-medium">IP Address: <span className="ml-1">172.10.20.123</span></p>
          </div>

          <div className="flex items-center gap-2">
            <MdRouter className="text-gray-700 text-[20px]" />
            <p className="text-sm font-medium">Default Gateway: <span className="ml-1">172.0.0.1</span></p>
          </div>
        </div>

        <button
          onClick={onScanNow}
          className="absolute bottom-6 left-6 right-6 rounded-[9px] bg-[#007AFF] py-3 text-[16px] font-semibold text-white transition hover:bg-blue-700"
        >
          Scan Now
        </button>
      </section>

      {/* Manual Scan */}
      <section className="absolute left-[293px] top-[550px] h-[64px] w-[436px]">
        <label htmlFor="ip" className="text-sm font-semibold text-[#191D23]">
          Enter IP Address
        </label>
        <div className="mt-2 flex w-full gap-2">
          <input
            id="ip"
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.0.1"
            className="flex-1 rounded border border-[#64748B] px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={onScanIp}
            className="rounded bg-[#34C759] px-6 py-2 font-semibold text-white transition hover:bg-green-600"
          >
            Scan
          </button>
        </div>
      </section>
    </>
  );
}
