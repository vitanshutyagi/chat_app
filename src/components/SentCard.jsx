import React from "react";
import {format} from "date-fns"

function SentCard({message,userId})
{
    // const formattedTime = format(new Date(message.createdAt), 'PPPpp');
    const formattedTime = format(new Date(message.createdAt), 'p')

    return (

        <div className=" max-w-max">
            {message.sender===userId ? 
            <div className="w-auto ">
                
                <p className="text-slate-900">as</p>
                <p className=" text-[12px] text-slate-400">  
                    {formattedTime}
                </p>
                <p className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl text-center p-2">
                    {message.content}
                </p>
                
            </div>  : 
            <div>
                <p></p>
            </div>  
        }
        </div>
    )
}
export default SentCard