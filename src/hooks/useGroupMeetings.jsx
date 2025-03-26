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

