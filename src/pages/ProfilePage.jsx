import { useState, useContext } from "react";
import { FaCamera, FaEdit, FaSave, FaEllipsisV } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/context";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    password: "", // Don't pre-fill password for security
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for modal visibility

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || "member";

  const handleEdit = (field) => setEditingField(field);

  const validateForm = () => {
    if (editingField === "email" && !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (editingField === "phone" && formData.phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setError(null);
      setSuccess(null);

      const updateData = {};
      if (editingField === "fullName" && formData.fullName !== currentUser.fullName) {
        updateData.fullName = formData.fullName;
      }
      if (editingField === "phone" && formData.phone !== currentUser.phone) {
        updateData.phone = formData.phone;
      }
      if (editingField === "email" && formData.email !== currentUser.email) {
        updateData.email = formData.email;
      }
      if (editingField === "password" && formData.password) {
        updateData.password = formData.password;
      }

      if (Object.keys(updateData).length === 0) {
        setEditingField(null);
        return;
      }

      console.log("Sending PATCH request with data:", updateData);
      console.log("User ID:", currentUser._id);
      console.log("Token:", token);

      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/auth/${currentUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      console.log("PATCH response status:", response.status);
      const responseText = await response.text();
      console.log("PATCH response text:", responseText);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseText);
        if (response.ok) {
          setCurrentUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          setSuccess("Profile updated successfully");
          setEditingField(null);
          setFormData({
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            password: "",
          });
        } else {
          setError(data.message || "Failed to update profile");
        }
      } else {
        setError("Unexpected response from server: " + responseText);
      }
    } catch (err) {
      console.error("Error in handleSave:", err);
      setError("Error updating profile: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    // Close the modal after confirming
    setShowDeleteModal(false);

    try {
      setError(null);
      setSuccess(null);

      console.log("Sending DELETE request for user ID:", currentUser._id);

      const response = await fetch(
        `https://circleup-backend-9eaf.onrender.com/api/auth/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("DELETE response status:", response.status);
      const responseText = await response.text();
      console.log("DELETE response text:", responseText);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseText);
        if (response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setCurrentUser(null);
          navigate("/login");
        } else {
          setError(data.message || "Failed to delete account");
        }
      } else {
        setError("Unexpected response from server: " + responseText);
      }
    } catch (err) {
      console.error("Error in handleDeleteAccount:", err);
      setError("Error deleting account: " + err.message);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-grow p-6">
        <Header />
        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-300">
            {/* Banner */}
            <div className="relative">
              <img
                src={(currentUser && currentUser.coverPhoto) || "https://via.placeholder.com/1200x300"}
                alt="Banner"
                className="w-full h-40 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="bannerUpload"
              />
              <label
                htmlFor="bannerUpload"
                className="absolute top-3 right-3 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
              >
                <FaCamera />
              </label>
              <div className="absolute left-6 -bottom-12">
                <img
                  src={(currentUser && currentUser.photo) || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileUpload"
                />
                <label
                  htmlFor="profileUpload"
                  className="absolute top-16 left-16 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
                >
                  <FaCamera />
                </label>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6 pt-16">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{currentUser?.fullName}</h2>
                <div className="relative">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <FaEllipsisV />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                      <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Settings
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)} // Open the modal instead of directly deleting
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete Account
                      </button>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          setCurrentUser(null);
                          navigate("/login");
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-500 mb-6">{currentUser?.role}</p>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              {success && <p className="text-green-500 text-center mb-4">{success}</p>}

              {/* Full Name */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Full Name</h3>
                  {editingField === "fullName" ? (
                    <input
                      type="text"
                      className="border p-2 rounded-md w-full"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-700">{currentUser?.fullName}</p>
                  )}
                </div>
                {editingField === "fullName" ? (
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handleSave}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit("fullName")}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>

              {/* Phone */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  {editingField === "phone" ? (
                    <input
                      type="text"
                      className="border p-2 rounded-md w-full"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-700">{currentUser?.phone}</p>
                  )}
                </div>
                {editingField === "phone" ? (
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handleSave}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit("phone")}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>

              {/* Email */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  {editingField === "email" ? (
                    <input
                      type="email"
                      className="border p-2 rounded-md w-full"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-700">{currentUser?.email}</p>
                  )}
                </div>
                {editingField === "email" ? (
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handleSave}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit("email")}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>

              {/* Password */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Password</h3>
                  {editingField === "password" ? (
                    <input
                      type="password"
                      className="border p-2 rounded-md w-full"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-700">************</p>
                  )}
                </div>
                {editingField === "password" ? (
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={handleSave}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit("password")}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>

              {editingField && (
                <div className="text-right">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;