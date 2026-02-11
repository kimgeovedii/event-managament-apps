import { useAuthStore } from "./../../../store/useAuthStore";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "../services/authService";
import { useStoreLogin } from "../store/useStoreLogin";
import { useRouter } from "next/navigation";

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export const useLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState();
  const { signIn, accessToken, refreshToken } = useStoreLogin();
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
    onSubmit: async (values) => {
      console.log("Login form values:", values);
      // TODO: Implement actual login logi
      await signIn(values);
    },
  });
  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
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
