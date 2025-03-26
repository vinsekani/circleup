import { BrowserRouter, Routes, Route } from "react-router-dom";
import Members from "../pages/Members";
import Contributions from "../pages/Contributions";
import Meetings from "../pages/Meetings";
import Announcements from "../pages/Announcements";
import ProfilePage from "../pages/ProfilePage";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Account from "../pages/Account";
import CreateGroup from "../pages/CreateGroup";
import MyContributions from "../pages/MyContributions";
import { useContext, useEffect } from "react";
import { StateContext } from "../context/context";

const Router = () => {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { dataForGroup, setDataForGroup } = useContext(StateContext);
  const {groupId, setGroupId} = useContext(StateContext)
    const {members, setMembers} = useContext(StateContext);
    const {meetings, setMeetings} = useContext(StateContext)
      const {announcements, setAnnouncements} = useContext(StateContext);
    const token = localStorage.getItem("token");


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setCurrentUser(userData);
    }
  }, []);

  const API_URL = "https://circleup-backend-9eaf.onrender.com/api/member";

  //  Get groupId from localStorage when the component mounts
  useEffect(() => {
    const storedGroupId = localStorage.getItem("groupId");
    console.log("Retrieved groupId:", storedGroupId);
    if (storedGroupId) {
      setGroupId(storedGroupId);
    }
  }, []);

  //  Fetch members only when groupId is available
  useEffect(() => {
    if (!groupId) return;

    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${groupId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch members");

        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [groupId]);





    // Fetch meetings when the component mounts
    useEffect(() => {
      const fetchMeetings = async () => {
        if (!groupId) {
          console.error("Group ID not found in local storage");
          return;
        }
  
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
          } else {
            console.error("Failed to fetch meetings:", data.message);
          }
        } catch (error) {
          console.error("Error fetching meetings:", error);
        }
      };
  
      fetchMeetings();
    }, [token, groupId]);


      // Fetch announcements
      useEffect(() => {
        const fetchAnnouncements = async () => {
          if (!groupId) {
            console.error("Group ID not found in local storage");
            return;
          }
    
          try {
            const response = await fetch(
              `https://circleup-backend-9eaf.onrender.com/api/announcement/${groupId}`,
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
              setAnnouncements(data);
            } else {
              console.error("Failed to fetch announcements:", data.message);
            }
          } catch (error) {
            console.error("Error fetching announcements:", error);
          }
        };
    
        fetchAnnouncements();
      }, [groupId, token]);


  return (
    <BrowserRouter>
      {console.log(dataForGroup)}
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="pricing" element={<Pricing />} />
      </Routes>
      <Routes>
        <Route path="account" element={<Account />} />
      </Routes>
      <Routes>
        <Route path="create-group" element={<CreateGroup />} />
      </Routes>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="members" element={<Members />} />
      </Routes>
      <Routes>
        <Route path="contributions" element={<Contributions />} />
      </Routes>
      <Routes>
        <Route path="mycontributions" element={<MyContributions />} />
      </Routes>
      <Routes>
        <Route path="meetings" element={<Meetings />} />
      </Routes>
      <Routes>
        <Route path="membermeetings" element={<Meetings />} />
      </Routes>
      <Routes>
        <Route path="announcements" element={<Announcements />} />
      </Routes>
      <Routes>
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
