"use client"
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import { useAtom } from "jotai";
import { messagesAtom } from "@/app/store";

const Home = () => {
  const [messages, setMessages] = useAtom(messagesAtom)
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const socket = io("http://localhost:8080");

  useEffect(() => {
    const listener = (text: any) => {
      setMessages(prev => [...prev, text]);
    }
    socket.on('message', listener)

    return () => {
      socket.off('message', listener);
    };
  }, [socket]);

  const handleMessage = (e: any) => {
    e.preventDefault();
    console.log("submitted")
    socket.emit('message', {name, message});
  }

  return (
    <div className="tw-w-full tw-flex tw-justify-center">
      <div className="tw-flex tw-flex-col tw-gap-4">
        <h1 className="tw-text-[20px] tw-font-bold">Chat App</h1>
        <div className="tw-flex tw-flex-col tw-rounded-md tw-bg-gray-300 tw-shadow-sm tw-gap-2 tw-p-2">
          <h1>Please enter your name for the Chat App</h1>
          <input type="text" onChange={e => setName(e.target.value)} className="tw-rounded-md"/>
        </div>
        <div className="tw-flex tw-flex-col tw-rounded-md tw-shadow-lg tw-w-full tw-bg-gray-300 tw-p-3">
          {
            messages.map((e, idx) => {
              return (
                <span key={idx}>
                  {e}
                </span>
              )
            })
          }
        </div>
        <div className="tw-rounded-md tw-shadow-md tw-p-4 tw-bg-gray-300">
          <form onSubmit={handleMessage}>
            <input type="text" placeholder="type your message here" className="tw-rounded-md tw-pl-2" onChange={(e) => setMessage(e.target.value)} />
            <button className="tw-rounded-md tw-bg-white tw-ml-3 tw-px-2 tw-border-[2px] tw-border-black">
              Send
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Home;