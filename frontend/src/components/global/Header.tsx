import { Link, NavLink } from "react-router-dom";

const navLink =
  "text-sm transition hover:text-black/80 text-gray-700 data-[active=true]:text-[#3563E9] data-[active=true]:font-semibold";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1024px] items-center justify-between px-5">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-sm bg-[#8DD51B]">
            <span className="h-3 w-3 bg-white" />
          </span>
          <span className="bg-gradient-to-r from-[#80BA24] to-[#8DD51B] bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            NST - Network Scan Tools
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="#" className={({ isActive }) => `${navLink}`} data-active={false}>
            File
          </NavLink>
          <NavLink to="/" className={({ isActive }) => `${navLink}`} data-active={true}>
            Scan
          </NavLink>
          <NavLink to="#" className={({ isActive }) => `${navLink}`} data-active={false}>
            Analyze
          </NavLink>
          <NavLink to="#" className={({ isActive }) => `${navLink}`} data-active={false}>
            Tools
          </NavLink>
          <NavLink to="#" className={({ isActive }) => `${navLink}`} data-active={false}>
            Help
          </NavLink>
        </nav>
      </div>
      <div className="h-px w-full border-t border-black/10" />
    </header>
  );
}
