import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Allip from "./pages/Allip/Allip";
import Singleip from "./pages/Singleip/Singleip";
import Export from "./pages/Export";
import Import from "./pages/Import";
import Settings from "./pages/Settings";
import QuickScan from "./pages/QuickScan";
import NewScan from "./pages/NewScan";
import StopScan from "./pages/StopScan";
import ScanResultsSummary from "./pages/ScanResultsSummary";
import ScanHistory from "./pages/ScanHistory";
import PingTool from "./pages/PingTool";
import Traceroute from "./pages/Traceroute";
import CompareIps from "./pages/CompareIps";
import PortsScan from "./pages/PortsScan";
import Documentation from "./pages/Documentation";
import ReportIssue from "./pages/ReportIssue";
import VersionInfo from "./pages/VersionInfo";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

export default function App() {
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="relative w-[1024px] h-[768px] bg-white shadow-xl rounded-[10px]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allip" element={<Allip />} />
            <Route path="/singleip/:ip" element={<Singleip />} />
            <Route path="/new" element={<Home />} />
            <Route path="/export" element={<Export />} />
            <Route path="/import" element={<Import />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/quick-scan" element={<QuickScan />} />
            <Route path="/new-scan" element={<NewScan />} />
            <Route path="/stop-scan" element={<StopScan />} />
            <Route path="/scan-results-summary" element={<ScanResultsSummary />} />
            <Route path="/scan-history" element={<ScanHistory />} />
            <Route path="/ping-tool" element={<PingTool />} />
            <Route path="/traceroute" element={<Traceroute />} />
            <Route path="/compare-ips" element={<CompareIps />} />
            <Route path="/ports-scan" element={<PortsScan />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/version-info" element={<VersionInfo />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
