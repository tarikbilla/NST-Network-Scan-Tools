import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';

export default function Allip() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090914] text-white">
      <Header />
      <main className="flex-1 px-4 py-10">
        <h1 className="text-4xl font-extrabold">ALL IP</h1>
        <p className="mt-2 text-slate-300">Welcome to your pixel-perfect starter.</p>
      </main>
      <Footer />
    </div>
  );
}
