import { useState, useEffect, useContext } from "react";
import { FaUser, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { StateContext } from "../context/context";

const Members = () => {
  const {members, setMembers} = useContext(StateContext);
  // const [members, setMembers] = useState([]);
  // const [groupId, setGroupId] = useState(null);
  const { groupId, setGroupId } = useContext(StateContext);

  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [newMember, setNewMember] = useState({
    fullName: "",
    phone: "",
    startDate: "",
  });

  const API_URL = "https://circleup-backend-9eaf.onrender.com/api/member";

  // //  Get groupId from localStorage when the component mounts
  // useEffect(() => {
  //   const storedGroupId = localStorage.getItem("groupId");
  //   console.log("Retrieved groupId:", storedGroupId);
  //   if (storedGroupId) {
  //     setGroupId(storedGroupId);
  //   }
  // }, []);

  // //  Fetch members only when groupId is available
  // useEffect(() => {
  //   if (!groupId) return;

  //   const fetchMembers = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch(`${API_URL}/${groupId}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) throw new Error("Failed to fetch members");

  //       const data = await response.json();
  //       setMembers(data);
  //     } catch (error) {
  //       console.error("Error fetching members:", error);
  //     }
  //   };

  //   fetchMembers();
  // }, [groupId]);

  //  Handle form inputs
  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  //  Add or Update Member
  const handleSave = async () => {
    if (!groupId) {
      console.error("Cannot save member: groupId is missing");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const url = editMember
        ? `${API_URL}/${editMember._id}`
        : `${API_URL}/new`;
      const method = editMember ? "PUT" : "POST";

      const payload = { ...newMember, groupId };
      console.log("Sending request to:", url);
      console.log("Payload:", JSON.stringify(payload));

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save member: ${errorText}`);
      }

      const result = await response.json();
      console.log("Response:", result);

      if (editMember) {
        setMembers(members.map((m) => (m._id === editMember._id ? result : m)));
      } else {
        setMembers([...members, result.newMember]);
      }

      setShowModal(false);
      setNewMember({ fullName: "", phone: "", startDate: "" });
      setEditMember(null);
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            {/* Header & Add Button */}
            <div className="flex justify-between border-b pb-3">
              <h2 className="text-xl font-semibold">Manage Members</h2>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center"
                onClick={() => {
                  setEditMember(null);
                  setNewMember({ fullName: "", phone: "", startDate: "" });
                  setShowModal(true);
                }}
              >
                <FaPlus className="mr-2" /> Add Member
              </button>
            </div>

            {/* Members Table */}
            <div className="mt-4">
              <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-center">Start Date</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr
                      key={member._id}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="p-3 flex items-center space-x-2">
                        <FaUser className="text-blue-500" />
                        {member.fullName}
                      </td>
                      <td className="p-3">{member.phone}</td>
                      <td className="p-3 text-center">
                        {new Date(member.startDate).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-center space-x-3">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEdit(member)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(member._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add/Edit Member Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      {editMember ? "Edit Member" : "Add Member"}
                    </h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowModal(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Form */}
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={newMember.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={newMember.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={newMember.startDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                      />
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      onClick={handleSave}
                    >
                      {editMember ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
