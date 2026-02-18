"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createOrganizer, inviteTeamMember } from "../services/organizerService";
import { useStoreLogin } from "../../auth/store/useAuthStore";

export interface TeamMemberInput {
  email: string;
}

export const useRegisterOrganizer = () => {
  const router = useRouter();
  const { me } = useStoreLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [teamEmails, setTeamEmails] = useState<TeamMemberInput[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Organizer name is required")
        .min(2, "Name must be at least 2 characters"),
      description: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await createOrganizer({
          name: values.name,
          description: values.description || undefined,
        });

        // Invite team members if any
        if (teamEmails.length > 0 && result.data?.id) {
          const invitePromises = teamEmails.map((member) =>
            inviteTeamMember(result.data.id, { email: member.email }).catch(
              (err) => {
                console.warn(`Failed to invite ${member.email}:`, err);
                return null;
              },
            ),
          );
          await Promise.allSettled(invitePromises);
        }

        // Refresh user data to get updated roles
        await me();

        setToast({
          open: true,
          message: "Organizer profile created! Redirecting...",
          severity: "success",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to create organizer profile";
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

  const addTeamEmail = () => {
    const email = newEmail.trim();
    if (!email) return;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({
        open: true,
        message: "Please enter a valid email address",
        severity: "error",
      });
      return;
    }

    // Check duplicate
    if (teamEmails.some((m) => m.email === email)) {
      setToast({
        open: true,
        message: "This email is already in the list",
        severity: "error",
      });
      return;
    }

    // Max 10 members
    if (teamEmails.length >= 10) {
      setToast({
        open: true,
        message: "Maximum 10 team members allowed",
        severity: "error",
      });
      return;
    }

    setTeamEmails((prev) => [...prev, { email }]);
    setNewEmail("");
  };

  const removeTeamEmail = (email: string) => {
    setTeamEmails((prev) => prev.filter((m) => m.email !== email));
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return {
    formik,
    isLoading,
    teamEmails,
    newEmail,
    setNewEmail,
    addTeamEmail,
    removeTeamEmail,
    toast,
    handleCloseToast,
  };
};
