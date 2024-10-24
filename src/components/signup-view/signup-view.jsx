import { useState } from "react";

export const SignupView = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday] = useState("");
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        const data = {
            Username: username,
            Password: password, 
            Email: email,
            Birthday: birthday
        }

        fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Signup failed");
            }
            return response.json();
        })
        .then (() => {
            setSuccess(true);
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        })
        .catch((e) => {
            setError(e.message);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4">
            <h2 className="tex-xl font-bold mb-4">Sign Up</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Signup seccessful! Redirecting...
                </div>
            )}
            <label className="flex flex-col gap-1">
                Username: 
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                className="border p-2 rounded"
                />
            </label>
            <label className="flex flex-col gap-1">
                Password:
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                className="border p-2 rounded"
                />
            </label>
            <label className="flex flex-col gap-1">
                Email:
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded"
                />
            </label>
            <label>
                Birthday:
                <input 
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="border p-2 rounded"
                />
            </label>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
        </form>
    );
};