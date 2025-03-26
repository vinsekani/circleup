import { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/context";

const useGroupMeetings = () => {
  const { meetings, setMeetings } = useContext(StateContext);
  const {groupId, setGroupId} = useContext(StateContext);

  const [meetingCount, setMeetingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  const fetchMeetings = async () => {
    if (!groupId) {
      setError("Group ID not found in local storage");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/meeting/${groupId}`,
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
        setMeetings(data);
        setMeetingCount(data.length);
      } else {
        setError(data.message || "Failed to fetch meetings");
      }
    } catch (err) {
      setError("Error fetching meetings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [token, groupId]);

  return { meetings, meetingCount, loading, error, fetchMeetings };
};

export default useGroupMeetings;



// import { useState, useEffect } from "react";

// const useGroupMembers = () => {
//   const [group, setGroup] = useState(null);
//   const [memberCount, setMemberCount] = useState(0);
//   const [meetings, setMeetings] = useState([]);
//   const [meetingCount, setMeetingCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token");
//   let user = null;
//   try {
//     const userData = localStorage.getItem("user");
//     user = userData ? JSON.parse(userData) : null;
//   } catch (err) {
//     console.error("Error parsing user from localStorage:", err.message);
//     setError("Invalid user data in local storage");
//   }
//   const groupId = user?.groupId;

//   console.log("useGroupMembers hook initialized");
//   console.log("Token:", token);
//   console.log("User:", user);
//   console.log("Group ID:", groupId);

//   const fetchGroupData = async () => {
//     if (!groupId) {
//       console.log("No groupId found in localStorage");
//       setError("Group ID not found in local storage");
//       setLoading(false);
//       return;
//     }

//     if (!token) {
//       console.log("No token found in localStorage");
//       setError("Authentication token not found");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       console.log("Fetching group data for groupId:", groupId);
//       const groupResponse = await fetch(
//         `https://circleup-backend-9eaf.onrender.com/api/group/${groupId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Group response status:", groupResponse.status);
//       const groupData = await groupResponse.json();
//       console.log("Group response data:", groupData);

//       if (!groupResponse.ok) {
//         console.error("Group fetch failed with status:", groupResponse.status);
//         throw new Error(groupData.message || "Failed to fetch group");
//       }

//       // Handle different response structures
//       const fetchedGroup = groupData.group || groupData;
//       console.log("Fetched group:", fetchedGroup);

//       if (!fetchedGroup || !fetchedGroup._id) {
//         console.error("Invalid group data:", fetchedGroup);
//         throw new Error("Invalid group data: missing required fields");
//       }

//       setGroup(fetchedGroup);
//       console.log("Setting member count...");
//       setMemberCount(fetchedGroup.members ? fetchedGroup.members.length : 0);
//       console.log("Member count set to:", fetchedGroup.members ? fetchedGroup.members.length : 0);

//       console.log("Proceeding to fetch meetings...");
//       console.log("Fetching meetings for groupId:", groupId);
//       const meetingsResponse = await fetch(
//         `https://circleup-backend-9eaf.onrender.com/api/meeting/${groupId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Meetings response status:", meetingsResponse.status);
//       const meetingsData = await meetingsResponse.json();
//       console.log("Meetings response data:", meetingsData);

//       if (!meetingsResponse.ok) {
//         console.error("Meetings fetch failed with status:", meetingsResponse.status);
//         setMeetingCount(0);
//         throw new Error(meetingsData.message || "Failed to fetch meetings");
//       }

//       if (!Array.isArray(meetingsData)) {
//         console.error("Meetings data is not an array:", meetingsData);
//         setMeetingCount(0);
//         throw new Error("Meetings data is not an array");
//       }

//       setMeetings(meetingsData);
//       console.log("Meetings data length:", meetingsData.length);
//       setMeetingCount(meetingsData.length);
//       console.log("Meeting count set to:", meetingsData.length);
//     } catch (err) {
//       console.error("Error in fetchGroupData:", err.message);
//       setError(err.message);
//       setMeetingCount(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered with groupId:", groupId, "and token:", token);
//     fetchGroupData();
//   }, []);

//   return { group, memberCount, meetings, meetingCount, loading, error, fetchGroupData };
// };

// export default useGroupMembers;