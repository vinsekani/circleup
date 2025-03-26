import { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/context";

const useGroupMembers = () => {
  const [group, setGroup] = useState(null);
  const {groupId, setGroupId} = useContext(StateContext);

  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchGroup = async () => {
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
        `https://circleup-backend-9eaf.onrender.com/api/group/${groupId}`,
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
        const fetchedGroup = data.group; // Extract the group from the response
        setGroup(fetchedGroup);
        setMemberCount(fetchedGroup.members ? fetchedGroup.members.length : 0);
      } else {
        setError(data.message || "Failed to fetch group");
      }
    } catch (err) {
      setError("Error fetching group: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId, token]);

  return { group, memberCount, loading, error, fetchGroup };
};

export default useGroupMembers;