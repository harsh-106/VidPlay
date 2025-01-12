import React from 'react'
import Avatar from 'react-avatar'

const ChatMessage = ({item}) => {
  return (
    <div className=' flex items-center '>
      <div>
      <Avatar src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png" size={20} round={true} className="cursor-pointer " /> 
      </div>
      <div className='flex items-center'>
        <h1 className='ml-2 font-bold text-sm'>{item.name}</h1>
        <p className='ml-2 py-2 text-sm'>{item.message}</p>
      </div>
    </div>
  )
}

export default ChatMessage
