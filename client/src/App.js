import React, { useEffect, useState } from 'react'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function App() {
  const [ message, setMessage ] = useState("")
  const [ messageReceived, setMessageReceived ] = useState("")
  const [ roomNum, setRoomNum ] = useState("")

  const joinRoom = (roomNum) => {
    if(roomNum !== "") {
      socket.emit("join_room", roomNum)
    }
  }

  const sendMessage = (message, roomNum) => {
    socket.emit("send_message", { message: message, room: roomNum })
  }

  useEffect(()=>{
    socket.on("receive_message", data => {
      setMessageReceived(data?.message)
    })
  },[socket])

  return (
    <div className="App">
      <input
        placeholder={'room num...'} value={roomNum}
        onChange={e=>setRoomNum(e.target.value)}
      />
      <button onClick={()=>joinRoom(roomNum)}>Join Room</button>
      <br/><br/>
      <input
        placeholder={'Message...'} value={message}
        onChange={e=>setMessage(e.target.value)}
      />
      <button onClick={()=>sendMessage(message, roomNum)}>send message</button>
      <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
