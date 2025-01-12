import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchSuggestion,
  toggleSidebar,
} from "../utils/appSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { SEARCH_SUGGESTION_API } from "../constant/youtube";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);

  const searchVideo = () => {
    dispatch(setCategory(input));
    setInput("");
  };
  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };

  const showSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTION_API + input);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (error) {
      console.log(error);
    }
  };

  const openSuggestion = () => {
    setSuggestion(true);
  }

  useEffect(() => {
   const timer = setTimeout (() => {
      showSuggestion();

    },200)

    return() => {
      clearTimeout(timer)
    }
  }, [input]);

  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white">
      <div className=" py-3 w-[98.2%] flex justify-between items-center">
        <div className="flex items-center ">
          <GiHamburgerMenu
            onClick={toggleHandler}
            size={"21px"}
            className="m-3 cursor-pointer"
          />
          <img
            className="px-4 "
            width={"135px"}
            src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-9.png"
            alt="YTLogo"
          />
        </div>
        <div className="flex w-[40%] items-center">
          <div className=" flex w-[100%]  ">
            <input
              value={input}
              onFocus={openSuggestion}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search"
              className=" w-full py-2 px-4 border border-gray-400 rounded-l-full outline-none"
            />
         
          <button
            onClick={searchVideo}
            className="py-2 border border-gray-400 rounded-r-full px-4"
          >
            {" "}
            <CiSearch size={"24px"} />{" "}
          </button>
          </div>

          {
            (suggestion && searchSuggestion.length !==0 ) && 
            <div className="absolute z-50 w-[30%] py-5 bg-white top-4 rounded-lg border border-gray-200 shadow-lg mt-12">
            <ul>
              {searchSuggestion.map((text, idx) => {
                return (
                  <div className=" flex  items-center px-4 hover:bg-gray-100">
                    <CiSearch className="" size="24px" />
                    <li className="px-2 py-1 cursor-pointer text-md font-medium ">{text}</li>
                  </div>
                );
              })}
            </ul>
          </div>
          }
         

        </div>

        

        <div className="flex w-[8%] justify-between items-center">
          <IoIosNotificationsOutline size={"28px"} className="cursor-pointer" />
          <RiVideoAddLine size={"28px"} className="cursor-pointer " />
          <Avatar
            src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
            size={30}
            round={true}
            className="cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
