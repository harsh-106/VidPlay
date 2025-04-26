import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "../constant/youtube";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/ChatSlice";
const Watch = () => {
  const [singleVideo, setSingleVideo] = useState("");
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
      );
      setSingleVideo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    dispatch(setMessage({
      name:"Harsh",
      message:input
    }));
    setInput("");
  }
  useEffect(() => {
    getSingleVideo();
  }, []);

  return (
    <div className="ml-4 flex w-full  mt-2" >
        <div className="flex w-[88%]">
        <div>
        <iframe
          width="900"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <h1 className="font-bold mt-2 text-lg">
          {singleVideo?.snippet?.title}
        </h1>
        <div className="flex justify-between items-center ">
          <div className="flex justify-between w-[35%] mt-1">
            <div className="flex">
              <Avatar
                src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
                size={30}
                round={true}
                className="cursor-pointer "
              />
              <h1 className="font-semibold ml-2">
                {singleVideo?.snippet?.channelTitle}
              </h1>
            </div>
            <button className=" px-4 py-1 font-medium bg-black text-white rounded-full ">
              Subscribe
            </button>
          </div>
          <div className="flex items-center w-[38%] justify-between mt-2">
            <div className=" flex items-center cursor-pointer bg-gray-400 px-4 py-2 rounded-full">
              <AiOutlineLike size={"21px"} className="mr-5" />
              <AiOutlineDislike size={"21px"} />
            </div>
            <div className=" flex items-center cursor-pointer bg-gray-400 px-4 py-2 rounded-full">
              <PiShareFatLight size={"21px"} className="mr-2" />
              <span>Share</span>
            </div>
            <div className=" flex items-center cursor-pointer bg-gray-400 px-4 py-2 rounded-full">
              <GoDownload size={"21px"} />
              <span>Download</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] ml-8 border border-gray-300 rounded-lg h-fit p-4">
        <div className=" flex justify-between items-center ">
          <h1>Top Chat</h1>
          <BsThreeDotsVertical />
        </div>
        <div className="overflow-y-auto h-[28rem] flex flex-col-reverse">
            <LiveChat />
        </div>
        <div className=" flex items-center justify-between border-t p-2">
            <div className="flex items-center w-[92%]">
                <div>
                <Avatar src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png" size={30} round={true} className="cursor-pointer " />
                </div>
                <input value={input} onChange={(e) => setInput(e.target.value)} className="border-b border-gray-300 outline-none ml-2 cursor-text " type="text" placeholder="Send Messages..." />
                <div className="bg-gray-200 cursor-pointer p-2 rounded-full">
                < LuSendHorizonal onClick={sendMessage} /> 
                </div>
            </div>

        </div>
      </div>
        </div>
      
    </div>
  );
};

export default Watch;
