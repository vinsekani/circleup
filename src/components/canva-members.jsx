import { useState } from "react";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Header from "./Header";

const members = [
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
];

const requests = [
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Pending",
    expiryDate: "28/02/2024",
  },
  {
    name: "Oroko Vincent",
    phone: "0701665262",
    status: "Approved",
    expiryDate: "28/02/2024",
  },
];

const MemberManagement = () => {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="p-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 ${
                  activeTab === "members"
                    ? "font-bold border-b-2 border-black"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("members")}
              >
                Manage Members
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "requests"
                    ? "font-bold border-b-2 border-black"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("requests")}
              >
                Requests
              </button>
            </div>

            {activeTab === "members" ? (
              <MemberTable members={members} />
            ) : (
              <RequestTable requests={requests} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberTable = ({ members }) => (
  <Table
    data={members}
    headers={["Name", "Phone", "Status", "Due Date", "Action"]}
    renderRow={(member) => [
      member.name,
      member.phone,
      <StatusBadge status={member.status} />,
      member.startDate,
      <ActionButtons />,
    ]}
  />
);

const RequestTable = ({ requests }) => (
  <Table
    data={requests}
    headers={["Name", "Phone", "Status", "Expiry Date", "Action"]}
    renderRow={(request) => [
      request.name,
      request.phone,
      <StatusBadge status={request.status} />,
      request.expiryDate,
      <RequestButtons status={request.status} />,
    ]}
  />
);

const Table = ({ data, headers, renderRow }) => (
  <table className="w-full table-auto border-collapse border">
    <thead className="bg-gray-100">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="border p-2">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          {renderRow(item).map((cell, cellIndex) => (
            <td key={cellIndex} className="border p-2">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 text-sm rounded ${
      status === "Paid" || status === "Approved"
        ? "bg-green-200 text-green-800"
        : status === "Pending"
        ? "bg-red-200 text-red-800"
        : "bg-gray-200 text-gray-800"
    }`}
  >
    {status}
  </span>
);

const ActionButtons = () => (
  <>
    <button className="text-blue-500 hover:text-blue-700">
      <FaEdit />
    </button>
    <button className="text-red-500 hover:text-red-700">
      <FaTrash />
    </button>
  </>
);

const RequestButtons = ({ status }) => (
  <>
    {status === "Pending" && (
      <>
        <button className="text-green-500 hover:text-green-700 mr-2">
          Approve
        </button>
        <button className="text-red-500 hover:text-red-700">Reject</button>
      </>
    )}
  </>
);

export default MemberManagement;

// This structure now has Manage Members and Requests, with the switch between tabs! 🎯 Let me know if you want any adjustments. 🚀
