import { useState, useEffect, useContext } from "react";
import {
  FaClock,
  FaTrash,
  FaEdit,
  FaMapMarkerAlt,
  FaEye,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { StateContext } from "../context/context";

const Meetings = () => {
  // const [meetings, setMeetings] = useState([]);
  const { meetings, setMeetings } = useContext(StateContext);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editMeetingId, setEditMeetingId] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    time: "",
    date: "",
    location: "",
    status: "Upcoming",
    participants: "",
    content: "",
    groupId: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";
  const creatorName = user ? user.fullName : "Unknown User";
  const [groupId, setGroupId] = useState(null);
  const token = localStorage.getItem("token");
  //  Get groupId from localStorage when the component mounts
  useEffect(() => {
    const storedGroupId = localStorage.getItem("groupId");
    console.log("Retrieved groupId:", storedGroupId);
    if (storedGroupId) {
      setGroupId(storedGroupId);
    }
    console.log(groupId);
  }, [groupId]);

  // Fetch meetings when the component mounts
  // useEffect(() => {
  //   const fetchMeetings = async () => {
  //     if (!groupId) {
  //       console.error("Group ID not found in local storage");
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `https://circleup-backend-9eaf.onrender.com/api/meeting/${groupId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       const data = await response.json();
  //       if (response.ok) {
  //         setMeetings(data);
  //       } else {
  //         console.error("Failed to fetch meetings:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching meetings:", error);
  //     }
  //   };

  //   fetchMeetings();
  // }, [token, groupId]);

  const filteredMeetings = meetings.filter(
    (meeting) => filter === "All" || meeting.status === filter
  );

  const handleDelete = async (meetingId) => {
    setMeetingToDelete(meetingId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/meeting/${meetingToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedMeetings = meetings.filter(
          (meeting) => meeting._id !== meetingToDelete
        );
        setMeetings(updatedMeetings);
        seteeting(updatedMeetings);
      } else {
        const data = await response.json();
        console.error("Failed to delete meeting:", data.message);
      }
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
    setIsDeleteModalOpen(false);
    setMeetingToDelete(null);
  };

  const getGradient = (status) => {
    switch (status) {
      case "Next":
        return "from-red-500 to-orange-500";
      case "Upcoming":
        return "from-yellow-500 to-green-500";
      case "Completed":
        return "from-blue-500 to-purple-500";
      default:
        return "from-gray-300 to-gray-400";
    }
  };

  const handleInputChange = (e) => {
    setNewMeeting({ ...newMeeting, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateMeeting = async () => {
    if (!groupId) {
      console.error("Group ID not found in local storage");
      return;
    }

    try {
      const meetingData = {
        title: newMeeting.title,
        time: newMeeting.time,
        date: newMeeting.date,
        location: newMeeting.location,
        content: newMeeting.content,
        status: newMeeting.status,
        groupId: groupId,
      };

      if (editMeetingId !== null) {
        // Update existing meeting
        const response = await fetch(
          `https://circleup-backend-9eaf.onrender.com/api/meeting/${editMeetingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(meetingData),
          }
        );

        const updatedMeeting = await response.json();
        if (response.ok) {
          // Update both meetings state and dashMeeting state
          const updatedMeetings = meetings.map((meeting) =>
            meeting._id === editMeetingId
              ? { ...meeting, ...updatedMeeting.meeting }
              : meeting
          );
          setMeetings(updatedMeetings);
        } else {
          console.error("Failed to update meeting:", updatedMeeting.message);
        }
      } else {
        // Add new meeting
        const response = await fetch(
          "https://circleup-backend-9eaf.onrender.com/api/meeting/new",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(meetingData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setMeetings([...meetings, data.newMeeting]);
        } else {
          console.error("Failed to add meeting:", data.message);
        }
      }

      setIsModalOpen(false);
      setEditMeetingId(null);
      setNewMeeting({
        title: "",
        time: "",
        date: "",
        location: "",
        status: "Next",
        participants: "",
        content: "",
        groupId: "",
      });
    } catch (error) {
      console.error("Error adding/updating meeting:", error);
    }
  };

  const handleEdit = (meeting) => {
    setEditMeetingId(meeting._id);
    setNewMeeting({
      title: meeting.title,
      time: meeting.time,
      date: new Date(meeting.date).toISOString().split("T")[0],
      location: meeting.location,
      status: meeting.status,
      participants: meeting.participants || "",
      content: meeting.content,
      groupId: meeting.group,
    });
    setIsModalOpen(true);
  };

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setIsDetailsModalOpen(true);
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-grow p-6">
        <Header />
        <div className="mx-auto w-full max-w-7xl">
          <div className="overflow-scroll h-[745px] bg-white p-6 shadow-lg rounded-2xl border-4 border-indigo-400">
            {/* Title & Button */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                📅 Manage Meetings & Events
              </h3>
              {role === "admin" && (
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setEditMeetingId(null);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md"
                >
                  + New Meeting
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "All"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setFilter("All")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "Upcoming"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setFilter("Upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === "Completed"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setFilter("Completed")}
              >
                Completed
              </button>
            </div>

            {/* Meeting List */}
            <div className="space-y-6">
              {filteredMeetings.map((meeting) => (
                <div
                  key={meeting._id}
                  className={`p-6 rounded-lg shadow-md bg-gradient-to-r ${getGradient(
                    meeting.status
                  )} text-white border-4 border-white`}
                >
                  <span className="px-3 py-1 text-sm font-semibold rounded bg-white text-gray-900 shadow-md">
                    {meeting.status}
                  </span>

                  <div className="mt-3">
                    <h4 className="text-lg font-bold">{meeting.title}</h4>
                    <p className="opacity-90">
                      <FaMapMarkerAlt className="inline mr-2" />{" "}
                      {meeting.location}
                    </p>
                    <p className="opacity-90">
                      <FaClock className="inline mr-2" /> {meeting.time}
                    </p>
                    <p className="opacity-90 mt-1">
                      Created By:{" "}
                      <span className="font-bold">{creatorName}</span>
                    </p>
                    <div className="mt-2 max-h-32 overflow-y-auto">
                      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                        {meeting.content}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-4">
                    {role === "admin" && (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                          onClick={() => handleEdit(meeting)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                          onClick={() => handleDelete(meeting._id)}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => handleViewDetails(meeting)}
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add/Edit Meeting Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">
                {editMeetingId !== null ? "Edit Meeting" : "Add New Meeting"}
              </h2>

              {/* Title */}
              <input
                type="text"
                name="title"
                value={newMeeting.title}
                placeholder="Title"
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              />

              {/* Date */}
              <input
                type="date"
                name="date"
                value={newMeeting.date}
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              />

              {/* Time */}
              <input
                type="time"
                name="time"
                value={newMeeting.time}
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              />

              {/* Location */}
              <input
                type="text"
                name="location"
                value={newMeeting.location}
                placeholder="Location"
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              />

              {/* Participants */}
              <input
                type="text"
                name="participants"
                value={newMeeting.participants}
                placeholder="Participants"
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              />

              {/* Status Dropdown */}
              <select
                name="status"
                value={newMeeting.status}
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              >
                <option value="Next">Next</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>

              {/* Content (Agenda) */}
              <textarea
                name="content"
                value={newMeeting.content}
                placeholder="Content (Agenda)"
                className="w-full p-2 border rounded mb-2"
                onChange={handleInputChange}
              />

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrUpdateMeeting}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {editMeetingId !== null ? "Update Meeting" : "Add Meeting"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {isDetailsModalOpen && selectedMeeting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">Meeting Details</h2>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <p>
                  <strong>Title:</strong> {selectedMeeting.title}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedMeeting.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedMeeting.time}
                </p>
                <p>
                  <strong>Location:</strong> {selectedMeeting.location}
                </p>
                <p>
                  <strong>Status:</strong> {selectedMeeting.status}
                </p>
                <p>
                  <strong>Creator:</strong> {creatorName}
                </p>
                <div>
                  <strong>Agenda:</strong>
                  <p className="mt-2 whitespace-pre-wrap break-words">
                    {selectedMeeting.content}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Delete Meeting
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this meeting? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setMeetingToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;
