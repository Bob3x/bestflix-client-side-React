import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

export default function LoginTest() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Login failed:", error.message);
        } else {
            console.log("Login successful:", data);
            dispatch(
                setUser({
                    user: data.user,
                    token: data.session.access_token
                })
            );
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Login (Test)</h2>
            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: "1rem" }}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: "1rem" }}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
