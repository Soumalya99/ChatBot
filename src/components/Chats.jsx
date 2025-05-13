import React, { useEffect, useRef } from 'react';
import { FaRegUser } from "react-icons/fa";
import ChatIcon from './ChatIcon';
import TypingIndicator from './TypingIndicator';
import ReactMarkdown from 'react-markdown';
import { TbRobot } from "react-icons/tb";


function Chats({ chatHistory }) {
    const chatBodyRef = useRef();

    useEffect(() => {
        if(chatBodyRef.current){
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    },[chatHistory]);


    return (
        <div ref={chatBodyRef} className="flex flex-col gap-4 p-4 h-[430px]  bg-gradient-to-b from-blue-400/70 to-indigo-400/70 overflow-y-auto scrollbar-hide">
            {chatHistory.map((msg, index) =>
                msg.role === 'model' ? (
                    <div key={index} className="flex items-start pt-2 gap-2">
                        <TbRobot size={37}/>
                        {msg.message === "loading-response" ? (
                            <TypingIndicator />
                        ) : (
                            <div className="prose max-w-[70%] bg-blue-200 rounded-lg px-4 py-2 text-gray-800">
                                <ReactMarkdown>
                                    {msg.message}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>

                ) : (
                    <div key={index} className="flex justify-end items-center gap-2">
                        <div className="prose max-w-[70%] bg-green-200/70 rounded-lg px-4 py-2 text-gray-800">
                            <ReactMarkdown>
                                {msg.message}
                            </ReactMarkdown>
                        </div>
                        <FaRegUser size={20}/>
                    </div>
                )
            )}
        </div>
    )
}

export default Chats