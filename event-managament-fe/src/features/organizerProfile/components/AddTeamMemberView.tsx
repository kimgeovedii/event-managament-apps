"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DashboardSidebar from "@/components/layouts/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { useSidebar } from "@/features/dashboard/hooks";
import { FloatingThemeToggle } from "@/features/theme";
import { useAddTeamMember } from "../hooks/useAddTeamMember";
import { Snackbar, Alert } from "@mui/material";

const AddTeamMemberView: React.FC = () => {
  const { isOpen, toggle, close } = useSidebar();
  const { formik, isLoading, toast, handleCloseToast } = useAddTeamMember();

  return (
    <div className="bg-gray-50 dark:bg-[#1a0c13] text-[#181114] dark:text-white font-[family-name:var(--font-display)] min-h-screen flex overflow-hidden">
      <DashboardSidebar isOpen={isOpen} onClose={close} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <DashboardHeader onMenuClick={toggle} />

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-gray-50 dark:bg-[#1a0c13]">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/profile"
                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#221019] rounded-xl border border-gray-200 dark:border-[#3a1d2e] transition-all"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Add Team Member
              </h1>
            </div>

            <div className="bg-white dark:bg-[#221019] border border-gray-200 dark:border-[#3a1d2e] rounded-xl p-6 md:p-8 shadow-sm">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5"
                    >
                      User Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full bg-gray-50 dark:bg-[#1a0c13] border border-gray-200 dark:border-[#3a1d2e] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="e.g. jondoe@example.com"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          error
                        </span>
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5"
                    >
                      Assign Role *
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        className="w-full appearance-none bg-gray-50 dark:bg-[#1a0c13] border border-gray-200 dark:border-[#3a1d2e] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-indigo-500 focus:border-transparent transition-all"
                        {...formik.getFieldProps("role")}
                      >
                        <option value="MEMBER">Member (Limited Access)</option>
                        <option value="ADMIN">
                          Admin (Can Add/Remove Members)
                        </option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {formik.touched.role && formik.errors.role ? (
                      <div className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          error
                        </span>
                        {formik.errors.role}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Submit / Cancel Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-[#3a1d2e]">
                  <Link
                    href="/dashboard/profile"
                    className="flex-1 py-3 px-4 bg-gray-100 dark:bg-[#1a0c13] text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-black/30 transition-all text-center border border-transparent dark:border-[#3a1d2e]"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-[2] py-3 px-4 bg-[#4F46E5] text-white text-sm font-semibold rounded-xl hover:bg-[#4338CA] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-500/20"
                  >
                    {isLoading ? "Inviting..." : "Send Invite"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <FloatingThemeToggle />
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddTeamMemberView;
