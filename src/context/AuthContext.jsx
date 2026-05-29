import { createContext, useState, useContext } from "react";

 const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(
        localStorage.getItem("currentUserEmail")
        ? { email: localStorage.getItem("currentUserEmail") }
        : null
    );

    function signUp(email, password) {

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.email === email)) {
            return { success: false, message: "Email already exists" };
        }

        const newUser = { email, password };

        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUserEmail', email);

        setUser({ email });

        return { success: true, message: "User registered successfully" };
    }

    function login(email, password) {

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            setUser(user);
            return { success: true, message: "Login successful" };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}