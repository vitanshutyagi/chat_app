import React from "react";
import { useNavigate } from "react-router-dom";

function UserList({user})
{

    const navigate = useNavigate()

    function handleClick()
    {
        navigate(`/chat/${user._id}`)
    }

    return (

        <div onClick={handleClick} className=" bg-slate-800 hover:cursor-pointer text-white h-12 min-w-24 flex justify-center items-center font-semibold rounded-2xl">
            {user.name}
        </div>
    )
}

export default UserList