import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

    const data = {
        Username: username,
        Password: password
    };

    fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => { 
        if (!response.ok) {
            throw new Error("Login failed");
        }
        return response.json();
    })
    .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setError("Invalid credentials");
        }
    })
    .catch((e) => {
        setError(e.message);
    });
}
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4">
            <h2 className="text-xl fond-bold mb-4">Login</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            <label className="flex flex-col gap-1">
                Username: 
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border p-2 rounded"
                    minLength="3"
                />
            </label>
            <label className="flex flex-col gap-1">
                Password 
                <input 
                    type="password"
                    value ={password}
                    onChange={(e) => 
                        setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
            </label>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
        </form>
    );
}