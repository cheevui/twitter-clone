import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";



export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            console.log(user);
            setCurrentUser(user);
            setLoading(false);
        })
    }, []);

    const value = { currentUser, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}