import { createContext, useState } from "react";

export const StateContext = createContext();

function StateProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [dataForGroup, setDataForGroup] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [members, setMembers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        dataForGroup,
        setDataForGroup,
        groupId,
        setGroupId,
        members,
        setMembers,
        meetings,
        setMeetings,
        announcements,
        setAnnouncements
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
