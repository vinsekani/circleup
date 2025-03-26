import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaUserFriends,
  FaCalendarCheck,
  FaBullhorn,
  FaHandHoldingUsd,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Header from "../components/Header";
import { StateContext } from "../context/context";
import useGroupMembers from "../hooks/useGroupMembers";
import useGroupMeetings from "../hooks/useGroupMeetings";

const Dashboard = () => {
  const { members, announcements, meetings } = useContext(StateContext);
  // const {  meetingCount, loading, error } = useGroupMembers();
  const {  meetingCount, loading, error } = useGroupMeetings();
  const {memberCount} = useGroupMembers()
  
  const nextMeeting = meetings.find((meeting) => meeting.status === "Next");

  console.log("Meeting count in Dashboard:", meetingCount);

  // Sort announcements by createdAt in descending order and get the most recent one
  const recentAnnouncement =
    announcements.length > 0
      ? [...announcements].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  const latestAnnouncement = {
    content:
      "Change of contribution rates. There are many variations of passages of Lorem Ipsum available...",
    date: "9 Sept 2025",
    sender: "Vinsekani",
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : "member";
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <Header />

        {/* Dashboard Content */}
        <div className="grid grid-cols-2 gap-10">
          <div className="gap-3">
            {/* Next Meeting */}

            <div>
              {nextMeeting ? (
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 shadow-lg rounded-2xl">
                  <h3 className="text-lg font-bold mb-4">Next Meeting</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCalendarCheck className="text-white text-lg" />
                    <p className="text-sm">
                      {new Date(nextMeeting.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-white text-lg" />
                    <p className="text-sm">{nextMeeting.time}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-white text-lg" />
                    <p className="text-sm">{nextMeeting.location}</p>
                  </div>
                  <p className="text-sm font-bold mt-2">Agenda:</p>
                  <p className="text-sm">{nextMeeting.content}</p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 shadow-lg rounded-2xl h-[10em]">
                  <p className="text-center text-[1.5em] font-bold">
                    No meeting available
                  </p>
                </div>
              )}
            </div>

            {/* Circle Table */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 shadow-lg rounded-2xl mt-[2em] h-[40em]">
              <h3 className="text-lg font-bold mb-4">Circle</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white bg-opacity-20">
                    <th className="p-2 text-left text-sm font-bold">Name</th>
                    <th className="p-2 text-left text-sm font-bold">
                      Getting Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, i) => (
                    <tr
                      key={member._id}
                      className="border-b border-white border-opacity-20"
                    >
                      <td className="p-2 flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white text-xs font-semibold">
                          {i + 1}
                        </span>
                        <span className="text-sm">{member.fullName}</span>
                      </td>
                      <td className="p-2 text-sm">{member.gettingDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            {/* Latest Announcement */}
            <div>
              {recentAnnouncement ? (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-lg rounded-2xl">
                  <h3 className="text-lg font-bold mb-4">Announcements</h3>
                  <p className="text-sm mb-4 leading-relaxed">
                    {latestAnnouncement.content}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <p>{latestAnnouncement.date}</p>
                    <p>By {latestAnnouncement.sender}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-lg rounded-2xl h-[10em]">
                  <p className="text-center text-[1.5em] font-bold">
                    No announcement available
                  </p>
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 p-6 shadow-lg rounded-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full shadow-md mb-4">
                  <FaHandHoldingUsd className="text-4xl text-white" />
                </div>
                <div className="relative w-full h-16 bg-white bg-opacity-20 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-300 animate-pulse"
                    style={{ width: "80%" }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold text-white text-xl">
                    Ksh. 15,000
                  </div>
                </div>
                <h3 className="text-white text-lg font-semibold mt-2">
                  Total Contribution
                </h3>
              </div>

              <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-6 shadow-lg rounded-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full shadow-md mb-4">
                  <FaHandHoldingUsd className="text-4xl text-white" />
                </div>
                <div className="relative w-full h-16 bg-white bg-opacity-20 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-gray-300 animate-pulse"
                    style={{ width: "80%" }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold text-white text-xl">
                    Ksh. 1,500
                  </div>
                </div>
                <h3 className="text-white text-lg font-semibold mt-2">
                  Support Funds
                </h3>
              </div>



                {!loading && !error && (
                  <div className="relative bg-gradient-to-br from-green-500 to-teal-500 p-6 shadow-lg rounded-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <div>
                      <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full shadow-md mb-4">
                        <FaUserFriends className="text-4xl text-white" />
                      </div>
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            fill="none"
                            stroke="#E0E0E0"
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15.5"
                            fill="none"
                            stroke="url(#gradStroke)"
                            strokeWidth="3"
                            strokeDasharray="80 100"
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                          />
                          <defs>
                            <linearGradient
                              id="gradStroke"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="white" />
                              <stop offset="100%" stopColor="#ddd" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                          {memberCount}
                        </div>
                      </div>
                      <h3 className="text-white text-lg font-semibold mt-2">
                        Members
                      </h3>
                    </div>
                  </div>
                )}

                {!loading && !error && (
                  <div className="relative bg-gradient-to-br from-yellow-500 to-orange-500 p-6 shadow-lg rounded-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    {loading && <p className="text-center text-gray-500">Loading...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full shadow-md mb-4">
                      <FaCalendarCheck className="text-4xl text-white" />
                    </div>
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          stroke="#E0E0E0"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          stroke="url(#gradStroke)"
                          strokeWidth="3"
                          strokeDasharray="80 100"
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                      {meetingCount !== undefined ? meetingCount : "N/A"}
                      </div>
                    </div>
                    <h3 className="text-white text-lg font-semibold mt-2">
                      Meetings
                    </h3>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
