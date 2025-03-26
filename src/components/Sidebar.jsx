import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../context/context";
import logo from "../assets/pro.png"


const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const { setDataForGroup } = useContext(StateContext);
  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    setDataForGroup(null);
    navigate("/login");
  };

  const adminLink = [
    { name: "Dashboard", icon: "🏠", path: "/dashboard" },
    { name: "Manage Members", icon: "👥", path: "/members" },
    { name: "Contributions", icon: "💳", path: "/contributions" },
    { name: "Meetings & Events", icon: "📋", path: "/meetings" },
    { name: "Announcements", icon: "🔔", path: "/announcements" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  const userLink = [
    { name: "Dashboard", icon: "🏠", path: "/dashboard" },
    // { name: "My Membership", icon: "👥", path: "" },
    { name: "My Contributions", icon: "💳", path: "/mycontributions" },
    { name: "Meetings & Events", icon: "📋", path: "/membermeetings" },
    { name: "Announcements", icon: "🔔", path: "/announcements" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  const menuItems = role === "admin" ? adminLink : userLink;

  return (
    <div className="w-64 h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 shadow-md border-r border-gray-300 backdrop-blur-md">
      {/* Sidebar Title */}
          <img src={logo} alt="Logo" className="h-[150px]"/>


      {/* Navigation Links */}
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 w-full px-6">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 font-medium hover:text-red-800 transition"
        >
          <span className="mr-3 text-xl">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
