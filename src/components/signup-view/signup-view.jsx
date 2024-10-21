import { useState } from "react";

export const SignupView = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password, 
            Email: email,
            Birthday: birthday
        }

        fetch("SIGNUP_URL", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("signup successful");
                window.location.reload();
            } else {
                alert("Singup failed");
            }
        });
    };
    return (
        <form onSubmit ={handleSubmit}>
            <button type="submit">Submit</button>
        </form>
    );
};