"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEditOrganizerProfile } from "../hooks/useEditOrganizerProfile";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import { useSidebar } from "@/features/dashboard/hooks";
import { FloatingThemeToggle } from "@/features/theme";
import { Snackbar, Alert } from "@mui/material";
import { ImageCropperModal } from "@/components/ImageCropperModal";

const EditOrganizerProfileView: React.FC = () => {
  const { isOpen, toggle, close } = useSidebar();
  const { 
    formik, 
    isLoading, 
    toast, 
    logoPreview, 
    imageToCrop,
    isCropperOpen,
    uploadProgress,
    handleLogoChange, 
    handleCropComplete,
    handleCropperClose,
    handleCloseToast 
  } = useEditOrganizerProfile();

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
                Edit Profile
              </h1>
            </div>

            <div className="bg-white dark:bg-[#221019] border border-gray-200 dark:border-[#3a1d2e] rounded-xl p-6 md:p-8 shadow-sm">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Logo Upload Section */}
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="relative group">
                    <div className="size-28 rounded-xl border-2 border-dashed border-gray-300 dark:border-[#3a1d2e] overflow-hidden bg-gray-50 dark:bg-black/20 flex flex-col items-center justify-center transition-all group-hover:border-[#4F46E5] dark:group-hover:border-indigo-500 relative">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-gray-400 font-medium text-sm flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                        </span>
                      )}

                      {isLoading && uploadProgress > 0 && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm z-10">
                          <span className="text-white font-black text-2xl drop-shadow-md">
                            {uploadProgress}%
                          </span>
                          <span className="text-white/80 text-[10px] font-bold uppercase mt-1">Uploading</span>
                        </div>
                      )}
                    </div>
                    <label className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity z-20">
                      <span className="material-symbols-outlined mb-1">upload</span>
                      <span className="text-xs font-semibold">Change Logo</span>
                      <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" className="hidden" onChange={handleLogoChange} />
                    </label>
                  </div>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Recommended: Square 500x500px • Max 2MB <br />
                    (JPEG, PNG, WEBP)
                  </p>
                </div>

                {/* Form Fields Section */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5"
                    >
                      Organizer Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full bg-gray-50 dark:bg-[#1a0c13] border border-gray-200 dark:border-[#3a1d2e] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="Enter organizer name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          error
                        </span>
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5"
                    >
                      Description / About Us
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      className="w-full bg-gray-50 dark:bg-[#1a0c13] border border-gray-200 dark:border-[#3a1d2e] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                      placeholder="Tell us about what kind of events you organize..."
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          error
                        </span>
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Form Actions */}
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
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <footer className="mt-20 pb-8 text-center">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
              © 2024 Hype Organizer Dashboard. All rights reserved.
            </p>
          </footer>
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

      <ImageCropperModal
        open={isCropperOpen}
        imageSrc={imageToCrop}
        onClose={handleCropperClose}
        onCropComplete={handleCropComplete}
        title="Crop Organizer Logo"
        aspectRatio={1} // Square crop
      />
    </div>
  );
};

export default EditOrganizerProfileView;
