import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useStoreLogin } from "../store/useAuthStore";
import { SignUp } from "../types/auth.types";

export type RegisterFormValues = SignUp;

export const useRegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useStoreLogin();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const formik = useFormik<SignUp>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      referralCode: "",
      terms: false,
      role: "CUSTOMER",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      terms: Yup.boolean().oneOf([true], "You must accept Terms & Conditions"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const success = await signUp(values);
        if (success) {
          setToast({
            open: true,
            message: "Registration successful! Redirecting to login...",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
             setToast({
            open: true,
            message: useStoreLogin.getState().error || "Registration failed. Please try again.",
            severity: "error",
          });
        }
      } catch (error: any) {
        console.error("Registration error:", error);
        setToast({
          open: true,
          message: "An unexpected error occurred",
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return {
    formik,
    showPassword,
    togglePasswordVisibility,
    isLoading,
    toast,
    handleCloseToast,
  };
};
