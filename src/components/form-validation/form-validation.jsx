import * as Yup from "yup";

export const validationSchema = Yup.object({ 
    Username: Yup.string()
    .max(15, "Must be 15 characters or less")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")
    .required("Username is required!"),
    Password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
    'Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 special character.')
    .required("Password is required!"),
    Email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required!"),
    Birthday: Yup.date()
    });