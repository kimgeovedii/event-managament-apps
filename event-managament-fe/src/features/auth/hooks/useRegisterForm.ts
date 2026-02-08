import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  referralCode: string;
  terms: boolean;
}

export const useRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      referralCode: "",
      terms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      terms: Yup.boolean().oneOf([true], "You must accept Terms & Conditions"),
    }),
    onSubmit: (values) => {
      console.log("Register form values:", values);
      // TODO: Implement actual registration logic
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    formik,
    showPassword,
    togglePasswordVisibility,
  };
};
