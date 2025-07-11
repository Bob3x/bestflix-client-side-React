import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SignUpTest() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            setMessage("Sign Up failed: " + error.message);
            console.error("Sign Up failed:", error.message);
        } else {
            setMessage("Sign Up successful!");
            console.log("Sign Up successful:", data);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Sign Up (Test)</h2>
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
            <button onClick={handleSignUp}>Sign Up</button>
            {message && (
                <div
                    style={{
                        marginTop: "1rem",
                        color: message.includes("failed") ? "red" : "green"
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
