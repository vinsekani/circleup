import { FaUser, FaTrash } from "react-icons/fa";

const requests = [
  { name: "Oroko Vincent", phone: "0701665262", status: "Pending", expiryDate: "28/02/2024" },
  { name: "Oroko Vincent", phone: "0701665262", status: "Approved", expiryDate: "28/02/2024" },
];

const RequestTable = () => {
  return (
    <>
      <h3 className="text-lg font-semibold my-4">Requests</h3>
      <input
        type="text"
        placeholder="Search Member"
        className="border p-2 rounded w-1/3 mb-4"
      />
      <table className="w-full table-auto border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Expiry Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2 flex items-center space-x-2">
                <FaUser className="text-blue-500" />
                {request.name}
              </td>
              <td className="border p-2">{request.phone}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    request.status === "Approved" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="border p-2">{request.expiryDate}</td>
              <td className="border p-2 space-x-2">
                {request.status === "Pending" ? (
                  <>
                    <button className="text-green-500 hover:text-green-700">Approve</button>
                    <button className="text-red-500 hover:text-red-700">Reject</button>
                  </>
                ) : (
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RequestTable;
