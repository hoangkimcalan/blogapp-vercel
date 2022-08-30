import React from 'react'
import { useRouter } from "next/router";
import { deleteCookie } from 'cookies-next';


function Logout() {

    const router = useRouter();

    const handleLogout = (req, res) => {
        localStorage.clear();
        deleteCookie("user", {
            req,
            res,
        });
        alert("Logout completed")
        router.replace("/auth/login");
    }

    return (
        <div className="cursor-pointer" onClick={handleLogout}>Logout</div>
    )
}

export default Logout;