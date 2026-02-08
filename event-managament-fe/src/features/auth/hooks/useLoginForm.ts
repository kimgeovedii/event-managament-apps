import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Login form values:", values);
      // TODO: Implement actual login logic
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
