import * as Yup from "yup";

// basic rules for validation - optional
const validationSchema = {
    Username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
    Password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
            "Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 special character."
        ),
    Email: Yup.string().email("Please enter valid email"),

    Birthday: Yup.date(),
};

// required for singup form etc.
export const signupSchema = Yup.object({
    ...validationSchema,
    Username: validationSchema.Username.required("Username is required!"),
    Password: validationSchema.Password.required("Password is required!"),
    Email: validationSchema.Email.required("Email is required!"),
    Birthday: validationSchema.Birthday.required("Birthday is required!"),
});

// again optional for update-user form or...
export const updateSchema = Yup.object(validationSchema);
