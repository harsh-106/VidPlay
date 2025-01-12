import React, { useEffect, useState } from 'react'
import Avatar from "react-avatar";
import axios from "axios"
import { API_KEY } from '../constant/youtube';

const VideoCart = ({item}) => {
  const [ytIcon, setYtIcon] = useState("");
  const getYoutubeChannelName = async() =>{
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY}`);
      console.log(res);
       if (res.data.items && res.data.items.length > 0) {
        setYtIcon(res.data.items[0].snippet.thumbnails.high.url);
      }
    } catch (error) {
      
      console.log(error);
    }
  }
useEffect (() => {
  getYoutubeChannelName();
}, [item])
  return (
    <div className='w-92 cursor-pointer my-3  '>
      <img className=' rounded-xl ' src={item.snippet.thumbnails.high.url} alt="VIDEO" />
        <div>
            <div className='flex mt-2'>
            <Avatar src={ytIcon} size={45} round={true} className="cursor-pointer " />
            <div className='ml-2'>
            <h1 className='font-semibold'>{item.snippet.title}</h1>
            <p className='text-sm text-gray-500'>{item.snippet.channelTitle}</p>
            </div>
            </div>
        </div>

    </div>
  )
}
export default VideoCart;