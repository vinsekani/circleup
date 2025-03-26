import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { StateContext } from "../context/context";

const Announcements = () => {
  // const [announcements, setAnnouncements] = useState([]);
  const { announcements, setAnnouncements } = useContext(StateContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";
  const creatorName = user ? user.fullName : "Unknown User";
  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("groupId");

  console.log("User from localStorage:", user);
  console.log("User role:", role);

  // // Fetch announcements
  // useEffect(() => {
  //   const fetchAnnouncements = async () => {
  //     if (!groupId) {
  //       console.error("Group ID not found in local storage");
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `https://circleup-backend-9eaf.onrender.com/api/announcement/${groupId}`,
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
  //         setAnnouncements(data);
  //       } else {
  //         console.error("Failed to fetch announcements:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching announcements:", error);
  //     }
  //   };

  //   fetchAnnouncements();
  // }, [groupId, token]);

  const handleInputChange = (e) => {
    setNewAnnouncement({
      ...newAnnouncement,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrUpdateAnnouncement = async () => {
    try {
      // Validate input
      if (!newAnnouncement.title || !newAnnouncement.content) {
        alert("Please fill in all fields");
        return;
      }

      const url = selectedAnnouncement
        ? `https://circleup-backend-9eaf.onrender.com/api/announcement/${selectedAnnouncement._id}`
        : "https://circleup-backend-9eaf.onrender.com/api/announcement/new";

      const method = selectedAnnouncement ? "PUT" : "POST";
      const body = {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        groupId: groupId,
      };

      console.log("Request details:", {
        url,
        method,
        body,
        token: token ? "Token exists" : "No token",
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update the announcements state based on whether we're adding or updating
      if (selectedAnnouncement) {
        setAnnouncements(
          announcements.map((ann) =>
            ann._id === selectedAnnouncement._id ? data.announcement : ann
          )
        );
      } else {
        setAnnouncements([...announcements, data.newAnnouncement]);
      }

      // Reset form and close modal
      setIsModalOpen(false);
      setNewAnnouncement({ title: "", content: "" });
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error("Error saving announcement:", error);
      alert(`Failed to save announcement: ${error.message}`);
    }
  };

  const handleDelete = async (announcementId) => {
    setSelectedAnnouncement(
      announcements.find((a) => a._id === announcementId)
    );
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/announcement/${selectedAnnouncement._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setAnnouncements(
          announcements.filter((a) => a._id !== selectedAnnouncement._id)
        );
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
    setIsDeleteModalOpen(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <Header />
        <div className="mx-auto w-full max-w-7xl">
          <div className="bg-white p-6 shadow-lg rounded-2xl border-4 border-indigo-400">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                📢 Announcements
              </h3>
              {role === "admin" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md flex items-center space-x-2"
                >
                  <FaPlus /> <span>New Announcement</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="p-6 rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-pink-500 text-white border-4 border-white"
                >
                  <h4 className="text-lg font-bold">{announcement.title}</h4>
                  <div className="mt-3 max-h-32 overflow-y-auto">
                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                      {announcement.content}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-6 text-sm opacity-90">
                    <p>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-4">
                      <p className="font-bold">By: {creatorName}</p>
                      {role === "admin" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedAnnouncement(announcement);
                              setNewAnnouncement({
                                title: announcement.title,
                                content: announcement.content,
                              });
                              setIsModalOpen(true);
                            }}
                            className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-600 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(announcement._id)}
                            className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">
                {selectedAnnouncement
                  ? "Edit Announcement"
                  : "New Announcement"}
              </h2>
              <input
                type="text"
                name="title"
                value={newAnnouncement.title}
                onChange={handleInputChange}
                placeholder="Announcement Title"
                className="w-full p-2 border rounded mb-4"
              />
              <textarea
                name="content"
                value={newAnnouncement.content}
                onChange={handleInputChange}
                placeholder="Announcement Content"
                className="w-full p-2 border rounded mb-4 h-48 resize-y"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedAnnouncement(null);
                    setNewAnnouncement({ title: "", content: "" });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrUpdateAnnouncement}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {selectedAnnouncement ? "Update" : "Add"} Announcement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Delete Announcement
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this announcement? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedAnnouncement(null);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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

export default Announcements;
