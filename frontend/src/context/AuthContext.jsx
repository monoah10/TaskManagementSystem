import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access")
    );

    const [user, setUser] = useState(null);

    const parseUserFromToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedUser = parseUserFromToken(token);
            setUser(decodedUser);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("access", token);
        setIsAuthenticated(true);

        const decodedUser = parseUserFromToken(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};