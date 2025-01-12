import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, YOUTUBE_VIDEO_API } from "../constant/youtube";
import VideoCart from "./VideoCart";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";

const VideoContainer = () => {
  const dispatch = useDispatch();
  
  const {video, category} = useSelector((store) => store.app);
  // jab bhi api call/ network call kr rahe ho toh apko hamesha useeffect use karna hai..
  const fetchingYoutubeVideo = async () => {
    try {
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`);
      dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideoByCategory = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`);
      dispatch(setHomeVideo(res?.data?.items));
      
    } catch (error) {
     console.log(error);
      
    }
  } 
   useEffect(() => {
    if(category === "All"){

      fetchingYoutubeVideo();
    }else{

      fetchVideoByCategory(category);
    }
  }, [category]);
  const open = useSelector((store) => store.app.open);

  return (
   <div className={`grid   ${open? "grid-cols-3" : "grid-cols-4 "} gap-5 
   `}>
    {
      video.map((item) => {
        return(
          <Link to={`/watch?v=${ typeof item.id === 'object' ? 
         item.id.videoId : item.id}`}
          key={typeof item.id === 'object' ? item.id.videoId : item.id}>
          <VideoCart  item={item} />
          </Link>
        )
      })
    }
    
  </div>
  )
};

export default VideoContainer;
