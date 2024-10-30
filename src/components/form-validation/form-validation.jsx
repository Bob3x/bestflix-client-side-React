import * as Yup from "yup";

export const validationSchema = Yup.object({ 
    Username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Username is required!"),
    Password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Password is required!"),
    Email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required!"),
    Birthday: Yup.date()
    });