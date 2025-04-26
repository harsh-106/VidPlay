import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCategory } from '../utils/appSlice';


const buttonList = ["All", "Shorts", "Live",  "Javascript", "Java", "Music", "Vlogs" , "Podcasts", "Trailer", "News", "Gaming", "Tech", "Cricket", "Comedy", "Thriller", "New to you" ]
const ButtonList = () => {
  const[active, setActive] = useState("All");
  const dispatch = useDispatch();
  const videoByTag = (tag) => {
    if(active !== tag){
      dispatch(setCategory(tag))
      setActive(tag)
    }
    
  }
console.log(active);

  return (
    <div className=' flex py-2 w-full overflow-x-scroll no-scrollbar '>
      {
        buttonList.map((buttonName, index) => {
          return (
            <div key={index}>

              <button onClick={() => {videoByTag(buttonName)}}  className={`${active == buttonName ? "bg-slate-700 text-white" : "bg-gray-200"} px-4 py-1 mx-2 rounded-lg font-medium`}><span className=' whitespace-nowrap '>{buttonName}</span></button>

            </div>
          ) 
        })
      }

    </div>
  )
}

export default ButtonList



