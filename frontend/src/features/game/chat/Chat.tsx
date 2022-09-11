import React, { useEffect } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectSocket } from '../gameSlice';

const Chat = () => {
  const socket = useAppSelector(selectSocket);
  useEffect(() => {
    socket.on("new_message", () => {
      
    });
  },[socket]);
  return (
    <div>Chat</div>
  )
}

export default Chat