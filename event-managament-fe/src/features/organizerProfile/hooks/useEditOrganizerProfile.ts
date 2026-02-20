import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { updateOrganizerProfile } from "../services/profileService";
import { useStoreLogin } from "../../auth/store/useAuthStore";
import { editOrganizerProfileSchema } from "../validations/editOrganizerProfileSchema";

export const useEditOrganizerProfile = () => {
  const router = useRouter();
  const { user, me } = useStoreLogin();
  const organizer = user?.organizer;

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: organizer?.name || "",
      description: organizer?.description || "",
    },
    validationSchema: editOrganizerProfileSchema,
    onSubmit: async (values) => {
      if (!organizer?.id) return;

      setIsLoading(true);
      try {
        await updateOrganizerProfile(organizer.id, {
          name: values.name,
          description: values.description || undefined,
        });

        // Refresh user data to get updated organizer info
        await me();

        setToast({
          open: true,
          message: "Profile updated successfully! Redirecting...",
          severity: "success",
        });

        setTimeout(() => {
          router.push("/dashboard/profile");
        }, 1500);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to update profile";
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
