import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/context";

const CreateGroup = ({ token }) => {
  const { currentUser } = useContext(StateContext);
  const { setDataForGroup, dataForGroup } = useContext(StateContext);

  const [groupData, setGroupData] = useState({
    name: "",
    slogan: "",
    amount: "",
    uid: currentUser ? `_${currentUser._id}` : "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const response = await fetch(
        "https://circleup-backend-9eaf.onrender.com/api/group/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(groupData),
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      if (!data._id) {
        throw new Error("groupId is missing from the response.");
      }

      //  Store groupId
      localStorage.setItem("groupId", data._id);
      console.log("Saved groupId:", data._id);

      setSuccess("Group created successfully!");
      setGroupData({
        name: "",
        slogan: "",
        amount: "",
        uid: currentUser ? currentUser._id : "",
      });
      // setDataForGroup(groupData)
      setDataForGroup(data);
      console.log(data);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Group</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Group Name</label>
            <input
              type="text"
              name="name"
              value={groupData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          {console.log("Data For Group:", dataForGroup)}
          {console.log("user:", currentUser)}
          <div className="mb-4">
            <label className="block text-gray-700">Slogan</label>
            <input
              type="text"
              name="slogan"
              value={groupData.slogan}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Daily Contribution</label>
            <input
              type="number"
              name="amount"
              value={groupData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Group"}
          </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
