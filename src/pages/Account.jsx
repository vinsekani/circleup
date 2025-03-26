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
import { FaUsers, FaUserShield } from "react-icons/fa";

const Account = () => {
  const navigate = useNavigate();
  const [memberGroups, setMemberGroups] = useState([]); // Groups where user is a member
  const [adminGroups, setAdminGroups] = useState([]); // Groups where user is an admin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const phone = user?.phone;
  const role = user?.role || "member"; // Default to "member" if role is not set

  useEffect(() => {
    const fetchMemberGroups = async () => {
      if (!phone) {
        setError("Phone number not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://circleup-backend-9eaf.onrender.com/api/group/member?phone=${encodeURIComponent(
            phone
          )}`,
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
          `https://circleup-backend-9eaf.onrender.com/api/group/all`,
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

      // Fetch member groups
      await fetchMemberGroups();

      // Fetch admin groups if the user is an admin
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
                  <button
                    key={group._id}
                    onClick={() => handleSelectGroup(group)}
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex justify-between items-center"
                    title="You are the admin of this group"
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
        )}
      </div>
    </div>
  );
};

export default Account;