"use client";

import React from "react";

interface UseNewsletterReturn {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useNewsletter = (): UseNewsletterReturn => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual newsletter subscription
    console.log("Subscribing:", email);
    
    // Simulate API call
    setTimeout(() => {
      setEmail("");
      setIsSubmitting(false);
    }, 500);
  }, [email]);

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
  };
};

export default useNewsletter;
