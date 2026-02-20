import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { addTeamMember } from "../services/teamService";
import { useStoreLogin } from "../../auth/store/useAuthStore";
import { addTeamMemberSchema } from "../validations/addTeamMemberSchema";

export const useAddTeamMember = () => {
  const router = useRouter();
  const { user, me } = useStoreLogin();
  const organizerId = user?.organizer?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "MEMBER" as "ADMIN" | "MEMBER",
    },
    validationSchema: addTeamMemberSchema,
    onSubmit: async (values) => {
      if (!organizerId) {
        setToast({
          open: true,
          message: "Organizer profile not found. Please try again.",
          severity: "error",
        });
        return;
      }

      setIsLoading(true);
      try {
        await addTeamMember(organizerId, {
          email: values.email,
          role: values.role,
        });

        // Optionally refresh user data if necessary to reflect owner status globally
        await me();

        setToast({
          open: true,
          message: "Team member added successfully! Redirecting...",
          severity: "success",
        });

        setTimeout(() => {
          router.push("/dashboard/profile");
        }, 1500);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to add team member";
        setToast({
          open: true,
          message,
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return {
    formik,
    isLoading,
    toast,
    handleCloseToast,
  };
};
