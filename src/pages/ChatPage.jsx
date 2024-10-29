import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import SentCard from "../components/SentCard";
import ReceivedCard from "../components/ReceivedCard";

function ChatPage ()
{
    const userId = useParams()
    const [sent,setSent] = useState([])
    const [received,setReceived] = useState([])
    const [user,setUser] = useState({})
    const [messages,setMessages] = useState([])

    useEffect(() => {
        getUser()
        // getMessages()
        // console.log(userId.userId);
    },[])
    useEffect(() => {
        getMessages()
        // console.log("object");
    },[])

    useEffect(() => {
        console.log("user fetched");
        // console.log("user = ",user);
        // console.log("rec = ",received);
        // console.log("sent = ",sent);
    }, [user],[received],[sent]);


    async function getMessages()
    {
        try
        {
            let res = await axios({
                method:'get',
                url:`http://localhost:4000/getReceivedMessages/${userId.userId}`
            })
            let rcvdArray = res.data.data
            console.log("rcvd array = ",rcvdArray);
            let res2 = await axios({
                method:'get',
                url:`http://localhost:4000/getSentMessages/${userId.userId}`
            })
            let sentArray = res2.data.data
            console.log("sent array = ",sentArray);

            let combinedMessages = [...rcvdArray, ...sentArray]
            combinedMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setMessages(combinedMessages)   
            console.log("messages = ",messages);
        }
        catch(e)
        {

        }
    }

    async function getUser()
    {
        try
        {
            let res = await axios({
                method:'get',
                url:`http://localhost:4000/getUser/${userId.userId}`
            })
            setUser(res.data.data)
            console.log("user = ",user);
            setReceived(res.data.data.messagesReceived)
            setSent(res.data.data.sentMessages)
            console.log("sent = ",sent);
            console.log("received = ",received);
        }
        catch(e)
        {
            console.log("Error in fetching user data.");
        }
    }

    return (

        <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-500">
            {/* {userId.userId} */}
            <div className="w-[50%] h-[90%] bg-slate-900 rounded-3xl text-white flex flex-col justify-center items-center">
                <div className="w-full h-[90%]  rounded-3xl pt-4 px-4  flex ">

                    {/* receiver messages */}
                    <div className=" w-[50%] h-full">
                        {/* <div className="">
                            {messages.map((message,index) => (
                                <div className="min-w-[15%] w-auto">
                                    <ReceivedCard message={message} key={index} userId={userId.userId}/>
                                </div>
                            ))}
                        </div> */}
                        {messages.map((message,index) => (
                            <div className="min-w-[15%] w-auto">
                                <ReceivedCard message={message} key={index} userId={userId.userId}/>
                            </div>
                        ))}
                    </div>


                    {/* sender messages */}
                    <div className=" w-[50%] h-full flex flex-col items-end">
                        {messages.map((message,index) => (
                            <div className="w-auto text-end">
                                <SentCard message={message} key={index} userId={userId.userId}/>
                            </div>
                        ))}
                    </div>


                    {/* <div className="w-[50%] h-full flex flex-col gap-2 items-start">
                        {received.map((message,index) => (
                            <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-2" key={index}>{message.content}</div>
                            
                        ))}
                    </div> */}

                    {/* </div> keep commented  */}
                    {/* <div className="w-[50%] h-full flex flex-col gap-2 items-end">
                        {sent.map((message,index) => (
                            <div className="bg-gradient-to-l from-cyan-500 to-emerald-500 rounded-3xl p-2" key={index}>{message.content}</div>
                        ))}
                    </div> */}
                    {/* <div> */}
                    {/* <div>
                        {messages.filter(message => message.sender === userId).map((message, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-l from-cyan-500 to-emerald-500 w-auto rounded-3xl p-2 my-1 self-end flex flex-col"
                            >
                                {message.content}
                                {message.sender}
                            </div>
                        ))}
                    </div> */}

                    {/* <div className="flex flex-col w-[50%]">
                        {messages.map((message,index) => (
                            <div className="w-full h-full bg-yellow-200 flex flex-col items-start">
                                {message.sender===userId.userId ? 
                                <div className="w-[50%] h-full  gap-2 items-start ">
                                    <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-2" key={index}>
                                        {message.content}
                                    </div>
                                </div> 
                                : 
                                <div key={index} className="h-0 bg-indigo-600">  
                                </div> 
                                }
                                
                            </div>
                        ))}
                    </div> */}
                    {/* <div className="flex w-[50%] flex-col ">
                        {messages.map((message,index) => (
                            <div className="w-full h-full bg-yellow-200 flex flex-col items-end">
                                {message.sender!==userId.userId ? 
                                <div className="w-[50%] h-full  gap-2 items-start ">
                                    <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-2" key={index}>
                                        {message.content}
                                    </div>
                                </div> 
                                : 
                                <div key={index} className="bg-red-800">
                                    
                                </div> }
                                
                            </div>
                        ))}
                    </div> */}
                    {/* </div> */}
                </div>
                <div className="w-[98%] h-[10%] rounded-full mb-2 flex justify-center items-center gap-2">
                    <input placeholder="Enter message" className="h-full w-[90%] px-4 text-xl rounded-full fill-black text-black" type="text"/>
                    <div className="w-[9%]">
                        <IoSend className=" fill-purple-500 size-14 hover:fill-purple-700 hover:cursor-pointer"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatPage

{/* <div className="w-[50%] h-full  gap-2 items-end bg-green-200 flex flex-col">
                                    <div className="bg-gradient-to-l from-cyan-500 to-emerald-500 rounded-3xl p-2 flex flex-col" key={index}>
                                        {message.content}
                                    </div>
                                </div>} */}