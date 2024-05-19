import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
    Axios.defaults.withCredentials = true
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/auth/logout");
                console.log(response)
                navigate("/");
            } catch (error) {
                console.error("Logout failed:", error);
                setError("Failed to logout. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        logout();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return null;
}

export default Logout;
