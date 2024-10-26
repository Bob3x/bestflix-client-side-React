import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SignupView = () => {
    // const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

    const formik = useFormik ({
        initialValues: {
            username: "",
            password: "",
            email: "",
            birthday: ""
        },
        validationShema: Yup.object({
            username: Yup.string().max(15, "Must be 15 characters or less").required("Username is required!"),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password is required!"),
            email: Yup.string().email("Please enter valid email").required("Email is required!"),
            birthday: Yup.string()
        }),
        onSubmit: (values, actions) => {
                // setErrors("");
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
                    actions.resetForm();
                })
                .catch((e) => {
                    setErrors(e.message);
                });
            }
    })

    

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4">
            <h2 className="tex-xl font-bold mb-4">Sign Up</h2>
            {formik.errors && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {formik.errors}
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
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // minLength="3"
                className={ formik.errors.username && touched.username ? "error" : "" }
                />
            </label>
            
            <label className="flex flex-col gap-1">
                Password:
                <input 
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // required
                // minLength="8"
                className={ formik.errors.password && touched.password ? "error" : "" }
                />
            </label>
            <label className="flex flex-col gap-1">
                Email:
            <input 
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // required
                className={ formik.errors.email && touched.email ? "error" : "" }
                />
            </label>
            <label>
                Birthday:
                <input 
                type="date"
                value={formik.values.birthday}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // required
                className="border p-2 rounded"
                />
            </label>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
        </form>
    );
};