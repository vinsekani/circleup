import { useState } from "react";
import { FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const contributions = [
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Paid",
    startDate: "28/02/2024",
  },
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Unpaid",
    startDate: "28/02/2024",
  },
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Paid",
    startDate: "28/02/2024",
  },
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Unpaid",
    startDate: "28/02/2024",
  },
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Paid",
    startDate: "28/02/2024",
  },
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Paid",
    startDate: "28/02/2024",
  },
];

const Contributions = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContributions = contributions.filter((contribution) => {
    const matchesSearch = contribution.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || contribution.status === filter;
    return matchesSearch && matchesFilter;
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-grow p-6">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 shadow-lg rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {role === "admin" ? "Manage Contributions" : "My Contributions"}
              </h3>
              <input
                type="text"
                placeholder="Search Member"
                className="border border-gray-300 p-2 rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-5 py-2 rounded-lg transition font-medium ${
                  filter === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setFilter("All")}
              >
                Show All
              </button>
              <button
                className={`px-5 py-2 rounded-lg transition font-medium ${
                  filter === "Unpaid"
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setFilter("Unpaid")}
              >
                <FaTimesCircle className="inline mr-2" />
                Pending Payments
              </button>
              <button
                className={`px-5 py-2 rounded-lg transition font-medium ${
                  filter === "Paid"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setFilter("Paid")}
              >
                <FaCheckCircle className="inline mr-2" />
                Paid
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="border p-3">Name</th>
                    <th className="border p-3">Phone</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Due Date</th>
                    <th className="border p-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContributions.map((contribution, index) => (
                    <tr
                      key={index}
                      className="text-center hover:bg-gray-100 transition"
                    >
                      <td className="border p-3 flex items-center space-x-2">
                        <FaUser className="text-blue-500" />
                        {contribution.name}
                      </td>
                      <td className="border p-3">{contribution.phone}</td>
                      <td className="border p-3">
                        <span
                          className={`px-3 py-1 text-sm rounded-lg ${
                            contribution.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {contribution.status}
                        </span>
                      </td>
                      <td className="border p-3">{contribution.startDate}</td>
                      <td className="border p-3">
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredContributions.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-600"
                      >
                        No contributions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributions;
