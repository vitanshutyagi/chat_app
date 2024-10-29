import React, { useEffect, useState } from "react";
import axios from 'axios'
import UserList from "../components/UserList";

function Home ()
{
    useEffect(() => {
        fetchUsers()
    },[])

    const [users,setUsers] = useState([{}])

    async function fetchUsers()  
    {
        try
        {
            let result = await axios({
                method:'get',
                url:'http://localhost:4000/getAllUsers'
            })
            setUsers(result.data.data)
        }
        catch(e)
        {
            console.log("Error in fetching users in Home : ",e.message);
        }
    }

    return (

        <div className="h-screen w-screen bg-slate-400 flex justify-center items-center">
            <div className="flex flex-col gap-4">
                {users.map((user,index) => (
                    <UserList key={index} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default Home