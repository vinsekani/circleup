// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Account = () => {
//   const navigate = useNavigate();
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user")); // Get the logged-in user
//   const phone = user?.phone; // Get the phone number from the user object

//   useEffect(() => {
//     const fetchGroups = async () => {
//       if (!phone) {
//         setError("Phone number not found. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(
//           `https://circleup-backend-9eaf.onrender.com/api/group/member?phone=${encodeURIComponent(
//             phone
//           )}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setGroups(data);
//         } else {
//           setError(data.message || "Failed to fetch groups");
//         }
//       } catch (err) {
//         setError("Error fetching groups: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       if (!phone) {
//         navigate("/login"); // Redirect to login if phone number is not found
//       } else {
//         fetchGroups();
//       }
//     } else {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [token, phone, navigate]);

//   const handleSelectGroup = (group) => {
//     localStorage.setItem(
//       "group",
//       JSON.stringify({
//         id: group._id,
//         amount: group.amount,
//         name: group.name,
//         status: group.status,
//       })
//     ); // Store the selected groupId
//     console.log(group);
//     navigate("/dashboard"); // Navigate to dashboard
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Your Groups</h2>

//         {loading && <p className="text-center text-gray-500">Loading...</p>}
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {!loading && !error && groups.length === 0 && (
//           <p className="text-center text-gray-500">
//             You are not a member of any groups yet.
//           </p>
//         )}

//         <div className="space-y-4">
//           {!loading &&
//             !error &&
//             groups.map((group) => (
//               <button
//                 key={group._id}
//                 onClick={(e) => handleSelectGroup(group)}
//                 className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//               >
//                 {group.name}
//               </button>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserShield, FaEdit, FaTrash } from "react-icons/fa";

const Account = () => {
  const navigate = useNavigate();
  const [memberGroups, setMemberGroups] = useState([]);
  const [adminGroups, setAdminGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null); // State for editing a group
  const [editForm, setEditForm] = useState({ name: "", slogan: "", amount: "", uid: "" }); // Form state for editing

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const phone = user?.phone;
  const role = user?.role || "member";

  console.log("User from localStorage:", user);
  console.log("Phone number:", phone);
  console.log("Role:", role);

  useEffect(() => {
    const fetchMemberGroups = async () => {
      if (!phone) {
        setError("Phone number not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://circleup-backend-9eaf.onrender.com/api/group/member?phone=${encodeURIComponent(phone)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMemberGroups(data);
        } else if (response.status === 404) {
          setMemberGroups([]);
        } else {
          setError(data.message || "Failed to fetch member groups");
        }
      } catch (err) {
        setError("Error fetching member groups: " + err.message);
      }
    };

    const fetchAdminGroups = async () => {
      try {
        const response = await fetch(
          `https://circleup-backend-9eaf.onrender.com/api/group/admin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAdminGroups(data);
        } else {
          setError(data.message || "Failed to fetch admin groups");
        }
      } catch (err) {
        setError("Error fetching admin groups: " + err.message);
      }
    };

    const fetchGroups = async () => {
      setLoading(true);
      setError(null);

      await fetchMemberGroups();
      if (role === "admin") {
        await fetchAdminGroups();
      }

      setLoading(false);
    };

    if (token) {
      if (!phone) {
        navigate("/login");
      } else {
        fetchGroups();
      }
    } else {
      navigate("/login");
    }
  }, [token, phone, role, navigate]);

  const handleSelectGroup = (group) => {
    console.log("Selected group:", group);
    localStorage.setItem(
      "group",
      JSON.stringify({
        id: group._id,
        amount: group.amount,
        name: group.name,
        status: group.status,
      })
    );
    const updatedUser = { ...user, groupId: group._id };
    console.log("Setting user in localStorage:", updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/dashboard");
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setEditForm({
      name: group.name,
      slogan: group.slogan || "",
      amount: group.amount || "",
      uid: group.uid || "",
    });
  };

  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/group/${editingGroup._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAdminGroups(
          adminGroups.map((g) => (g._id === editingGroup._id ? data : g))
        );
        setEditingGroup(null);
        setEditForm({ name: "", slogan: "", amount: "", uid: "" });
      } else {
        setError(data.message || "Failed to update group");
      }
    } catch (err) {
      setError("Error updating group: " + err.message);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/group/${groupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAdminGroups(adminGroups.filter((g) => g._id !== groupId));
      } else {
        setError(data.message || "Failed to delete group");
      }
    } catch (err) {
      setError("Error deleting group: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Groups</h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Member Groups */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaUsers className="mr-2" /> Groups You Are a Member Of
          </h3>
          {!loading && !error && memberGroups.length === 0 && (
            <p className="text-center text-gray-500">
              You are not a member of any groups yet.
            </p>
          )}
          <div className="space-y-4">
            {!loading &&
              !error &&
              memberGroups.map((group) => (
                <button
                  key={group._id}
                  onClick={() => handleSelectGroup(group)}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex justify-between items-center"
                >
                  <span>{group.name}</span>
                  <span className="flex items-center space-x-1">
                    <FaUsers className="text-white" />
                    <span>{group.members ? group.members.length : 0}</span>
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* Admin Groups (only shown if user is an admin) */}
        {role === "admin" && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaUserShield className="mr-2" /> Groups You Administer
            </h3>
            {!loading && !error && adminGroups.length === 0 && (
              <p className="text-center text-gray-500">
                You have not created any groups yet.
              </p>
            )}
            <div className="space-y-4">
              {!loading &&
                !error &&
                adminGroups.map((group) => (
                  <div
                    key={group._id}
                    className="flex items-center justify-between bg-green-600 text-white p-3 rounded-lg"
                  >
                    <button
                      onClick={() => handleSelectGroup(group)}
                      className="flex-1 flex justify-between items-center hover:bg-green-700 rounded-lg p-1"
                    >
                      <span>{group.name}</span>
                      <span className="flex items-center space-x-1">
                        <FaUsers className="text-white" />
                        <span>{group.members ? group.members.length : 0}</span>
                      </span>
                    </button>
                    <div className="flex space-x-2 ml-2">
                      <button
                        onClick={() => handleEditGroup(group)}
                        className="text-white hover:text-yellow-300"
                        title="Edit group"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group._id)}
                        className="text-white hover:text-red-300"
                        title="Delete group"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Edit Group Form (Modal) */}
        {editingGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit Group</h3>
              <form onSubmit={handleUpdateGroup}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="mt-1 p-2 w-full border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Slogan
                  </label>
                  <input
                    type="text"
                    value={editForm.slogan}
                    onChange={(e) =>
                      setEditForm({ ...editForm, slogan: e.target.value })
                    }
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    UID
                  </label>
                  <input
                    type="text"
                    value={editForm.uid}
                    onChange={(e) =>
                      setEditForm({ ...editForm, uid: e.target.value })
                    }
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingGroup(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;