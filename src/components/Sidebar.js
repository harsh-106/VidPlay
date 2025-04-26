import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/appSlice";

const sidebarItem = [
  {
    icons: <AiFillHome path="/"  size={"24px"} />,
    title: "Home",
    
  },
  {
    icons: <SiYoutubeshorts size={"24px"} />,
    title: "Shorts",
  },
  {
    icons: <MdOutlineSubscriptions
      size={"24px"} />,
    title: "Subscriptions",
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector((store) => store.app.open);

  const handleItemClick = (item) => {
    dispatch(setCategory(item.title)); // Dispatch action
    navigate(item.path); // Navigate to the path
    console.log(item.path);
    
  };

  return (
    <div className={`ml-6 relative left-0 ${open? "w-[13%]" : "w-[6%]"} pr-4 h-[calc(100vh-4.625rem)]   overflow-y-scroll overflow-x-hidden bg-white `}>  
    {/*  4rem  */}
      {sidebarItem.map((item, index) => {
        return (
          <div key={index} className="flex my-3 cursor-pointer" onClick={() => handleItemClick(item)}>
            {item.icons}
            <p className={`ml-5 ${open? "": "hidden"}`}>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;