import React from "react";
import { useContext } from "react";
import { StateContext } from "../context/context";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(StateContext);
    return (
      <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-2xl mb-6">
      <h2 className="text-xl font-bold text-[#333]">Dashboard</h2>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"><img className="rounded-full" src={currentUser && currentUser.photo} alt="profile" /></div>
        <div>
          <p className="text-sm font-semibold text-[#333]">{currentUser && currentUser.fullName}</p>
          <p className="text-xs text-[#999]">{currentUser && currentUser.email}</p>
        </div>
      </div>
    </header>
    );
  };
  
  export default Header;
  