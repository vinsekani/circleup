import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useContext } from "react";
import { StateContext } from "../context/context";
import { header } from "framer-motion/client";

const contributions = [
  { group: "Lions", amount: "Ksh. 200", date: "18/3/2025", status: "Upcoming" },
];

const history = [
  { group: "Lions", amount: "Ksh.200", status: "Paid", date: "17/3/2025" },
  { group: "Lions", amount: "Ksh.200", status: "Unpaid", date: "16/3/2025" },
  { group: "Lions", amount: "Ksh.200", status: "Paid", date: "15/3/2025" },
  { group: "Lions", amount: "Ksh.200", status: "Unpaid", date: "14/3/2025" },
  { group: "Lions", amount: "Ksh.200", status: "Paid", date: "13/3/2025" },
  { group: "Lions", amount: "Ksh.200", status: "Paid", date: "12/3/2025" },
  { group: "Lions", amount: "Ksh.200", status: "Paid", date: "11/3/2025" },
];

const MyContributions = () => {
  const { currentUser } = useContext(StateContext);
  const { groups } = useContext(StateContext);

  const handleContribution = async (e) => {
    e.preventDefault();
    if (e.target.textContent.toLowerCase() === "pay") {
      const group = JSON.parse(localStorage.getItem("group"));
      const body = {
        phone: currentUser.phone,
        amount: group.amount,
      };
      const url = "https://circleup-backend-9eaf.onrender.com/api/mpesa/stk";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      console.log(response)

      console.log(data);
    }
  };
  const group = JSON.parse(localStorage.getItem("group"));

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-grow p-6">
        <Header />
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          {/* Next Contribution */}
          <h2 className="text-lg font-semibold mb-4">Next Contribution</h2>
          <table className="w-full border-collapse bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                <th className="p-3 text-left">Group</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Pay Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {contributions.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{group.name}</td>
                  <td className="p-3">Ksh.{group.amount}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                      onClick={(e) => handleContribution(e)}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* History Section */}
          <h2 className="text-lg font-semibold mt-6 mb-4">History</h2>
          <table className="w-full border-collapse bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                <th className="p-3 text-left">Group</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{group.name}</td>
                  <td className="p-3">Ksh.{group.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">
                    {item.status === "Unpaid" && (
                      <button
                        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                        onClick={(e) => handleContribution(e)}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyContributions;
