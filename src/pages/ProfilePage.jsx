import { useState } from "react";
import { FaCamera, FaEdit, FaSave, FaEllipsisV } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import React from "react";
import { useContext } from "react";
import { StateContext } from "../context/context";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fullName, setFullName] = useState("Vi Sekani");
  const [phone, setPhone] = useState("0701665262");
  const [email, setEmail] = useState("vinsekani@gmail.com");
  const [password, setPassword] = useState("************");
    const { currentUser, setCurrentUser } = useContext(StateContext);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "profile") setProfileImage(imageUrl);
      else setBannerImage(imageUrl);
    }
  };

  const handleEdit = (field) => setEditingField(field);
  const handleSave = () => setEditingField(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";

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
                src={currentUser && currentUser.coverPhoto}
                alt="Banner"
                className="w-full h-40 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="bannerUpload"
                onChange={(e) => handleImageUpload(e, "banner")}
              />
              <label
                htmlFor="bannerUpload"
                className="absolute top-3 right-3 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
              >
                <FaCamera />
              </label>
              <div className="absolute left-6 -bottom-12">
                <img
                  src={currentUser && currentUser.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileUpload"
                  onChange={(e) => handleImageUpload(e, "profile")}
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
                <h2 className="text-2xl font-semibold">{currentUser && currentUser.fullName}</h2>
                <div className="relative">
                  <button className="text-gray-600 hover:text-gray-900">
                    <FaEllipsisV />
                  </button>
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 hidden group-hover:block">
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mb-6">{currentUser && currentUser.role}</p>

              {/* Full Name */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Full Name</h3>
                  {editingField === "fullName" ? (
                    <input
                      type="text"
                      className="border p-2 rounded-md w-full"
                      value={currentUser && currentUser.fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">{currentUser && currentUser.fullName}</p>
                  )}
                </div>
                {editingField === "fullName" ? (
                  <button className="text-green-600 hover:text-green-800" onClick={handleSave}>
                    <FaSave />
                  </button>
                ) : (
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit("fullName")}>
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">{currentUser && currentUser.phone}</p>
                  )}
                </div>
                {editingField === "phone" ? (
                  <button className="text-green-600 hover:text-green-800" onClick={handleSave}>
                    <FaSave />
                  </button>
                ) : (
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit("phone")}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">{currentUser && currentUser.email}</p>
                  )}
                </div>
                {editingField === "email" ? (
                  <button className="text-green-600 hover:text-green-800" onClick={handleSave}>
                    <FaSave />
                  </button>
                ) : (
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit("email")}>
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-700">{password}</p>
                  )}
                </div>
                {editingField === "password" ? (
                  <button className="text-green-600 hover:text-green-800" onClick={handleSave}>
                    <FaSave />
                  </button>
                ) : (
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit("password")}>
                    <FaEdit />
                  </button>
                )}
              </div>
              
              {editingField && (
                <div className="text-right">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
