import React from "react";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const SignupView = () => {
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

        const onSubmit = {(values, { setSubmitting }) => {
                setErrors("");
                setSuccess("");

        
                const data = {
                    Username: username,
                    Password: password, 
                    Email: email,
                    Birthday: birthday
                }
        
                fetch("https://my-movies-flix-app-56f9661dc035.herokuapp.com/users", {
                    method: "POST",
                    body: JSON.stringify(values, data),
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
                        setSubmitting(false);
                    }, 2000);
                    actions.resetForm();
                })
                .catch((e) => {
                    actions.setErrors(e.message);
                });
            }} 
            >

    return (
        <Formik
        initialValues={{ username: "", email: "", birthday: "" }}
        validationSchema={Yup.object({ 
            username: Yup.string().max(15, "Must be 15 characters or less").required("Username is required!"),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password is required!"),
            email: Yup.string().email("Please enter valid email").required("Email is required!"),
            birthday: Yup.string()
        })}
        onSubmit={handleSubmit, setSubmitting} className="flex flex-col gap-4 max-w-md mx-auto p-4">
            <h2 className="tex-xl font-bold mb-4">Sign Up</h2>
            {formik.errors && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {formik.errors}
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Signup seccessful! Redirecting...
                </div>  >
            )}
            >
            <Form>
            <label className="flex flex-col gap-1">Username:</label>
            <Field className="border p-2 rounded" name="username" type="text" />
            <ErrorMessage className="error" name="username" />

            <label className="flex flex-col gap-1">Password:</label>
            <Field className="border p-2 rounded" name="password" type="password" />
            <ErrorMessage className="error" name="password" />

            <label className="flex flex-col gap-1">Email:</label>
            <Field className="border p-2 rounded" name="email" type="email" />
            <ErrorMessage className="error" name="email" />

            <label className="flex flex-col gap-1">Birthday:</label>
            <Field className="border p-2 rounded" name="birthday" type="date" />
            <ErrorMessage className="error" name="birthday" />
            
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
        </Form>
        </Formik>
    );
};