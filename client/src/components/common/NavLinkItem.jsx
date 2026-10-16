import { NavLink } from "react-router-dom";

const styles = {
  active: "bg-indigo-500/15 text-indigo-300",
  highlight: "text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300",
  default: "text-gray-300 hover:bg-gray-800 hover:text-white",
};

export default function NavLinkItem({ to, children, highlight = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:py-2 ${
          styles[isActive ? "active" : highlight ? "highlight" : "default"]
        }`
      }
    >
      {children}
    </NavLink>
  );
}
