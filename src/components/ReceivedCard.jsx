import React from "react";
import {format} from "date-fns"

function ReceivedCard({message,userId})
{
    const formattedTime = format(new Date(message.createdAt), 'p')

    console.log("In rcvd card");
    return (

        <div className=" w-auto">
            {message.sender!==userId ? 
            <div className="w-auto max-w-max">
                <p className=" text-[12px] text-slate-400">
                    {formattedTime}
                </p>
                <p className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-2 w-auto text-center">
                    {message.content}
                </p>
                <p className="text-slate-900">as </p>
                <p className="text-slate-900">as </p>
                
            </div>  : 
            <div>
                <p></p> 
            </div>  
        }
        </div>
    )
}
export default ReceivedCard
// incredible india