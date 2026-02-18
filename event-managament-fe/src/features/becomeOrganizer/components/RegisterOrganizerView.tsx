"use client";

import React from "react";
import Link from "next/link";
import { useRegisterOrganizer } from "../hooks/useRegisterOrganizer";
import {
  PlusCircleIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

const RegisterOrganizerView: React.FC = () => {
  const {
    formik,
    isLoading,
    teamEmails,
    newEmail,
    setNewEmail,
    addTeamEmail,
    removeTeamEmail,
    toast,
    handleCloseToast,
  } = useRegisterOrganizer();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black font-display">
      {/* Header */}
      <header className="h-20 bg-gray-50 dark:bg-black border-b-4 border-gray-200 dark:border-white/10 fixed w-full top-0 z-50 flex items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-4">
          <div className="size-10 text-gray-900 dark:text-white">
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
            Hype
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          <span className="text-lg font-black uppercase text-[#A855F7] underline decoration-4 underline-offset-4">
            For Organizers
          </span>
          <Link
            href="/"
            className="text-lg font-black uppercase text-gray-900 dark:text-white hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors"
          >
            Home
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="bg-[#ee2b8c] dark:bg-[#FF00FF] text-white px-4 py-1 font-black uppercase text-sm mb-4 inline-block italic">
              Phase 01: Setup
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 text-gray-900 dark:text-white">
              CREATE YOUR <br />
              <span className="text-[#00bcd4] dark:text-[#00F0FF]">
                EMPIRE.
              </span>
            </h1>
            <p className="text-xl font-bold uppercase tracking-wide text-gray-500 dark:text-white/60">
              Tell the world who&apos;s running the show.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-12">
            {/* 01. Organizer Name */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500 dark:text-white/50">
                01. Organizer Name
              </label>
              <input
                className="w-full bg-white dark:bg-black border-4 border-gray-200 dark:border-white/20 rounded-none px-4 py-3 text-xl font-bold text-gray-900 dark:text-white focus:ring-0 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] placeholder:text-gray-300 dark:placeholder:text-white/30 transition-all outline-none"
                placeholder="e.g. NEON PULSE PRODUCTIONS"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-500 font-bold uppercase text-[10px] px-1">
                  {formik.errors.name}
                </span>
              )}
            </div>

            {/* 02. Bio / Intro */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500 dark:text-white/50">
                02. Bio / Intro
              </label>
              <textarea
                className="w-full bg-white dark:bg-black border-4 border-gray-200 dark:border-white/20 rounded-none px-4 py-3 text-xl font-bold text-gray-900 dark:text-white focus:ring-0 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] placeholder:text-gray-300 dark:placeholder:text-white/30 transition-all resize-none outline-none"
                placeholder="Tell the hypebeasts what you're about..."
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
            </div>

            {/* 03. Branding (Logo) — Visual only for now */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest mb-2 text-gray-500 dark:text-white/50">
                03. Branding (Logo)
              </label>
              <div className="border-4 border-dashed border-gray-200 dark:border-white/20 bg-white dark:bg-black p-12 text-center group cursor-pointer hover:bg-[#00bcd4]/5 dark:hover:bg-[#00F0FF]/5 transition-colors">
                <input className="hidden" id="logo-upload" type="file" />
                <label className="cursor-pointer" htmlFor="logo-upload">
                  <PhotoIcon className="size-16 mb-4 mx-auto text-gray-300 dark:text-white/30 group-hover:scale-110 transition-transform" />
                  <p className="font-black uppercase text-xl text-gray-900 dark:text-white">
                    Drop your heat here
                  </p>
                  <p className="text-sm font-bold text-gray-400 dark:text-white/40 uppercase mt-2">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>
            </div>

            {/* 04. Invite Team (Optional) */}
            <div className="space-y-4">
              <div className="flex items-end justify-between border-b-4 border-gray-200 dark:border-white/20 pb-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-white/50">
                  04. Invite Team (Optional)
                </label>
                <span className="text-[10px] font-black uppercase bg-gray-900 dark:bg-white text-white dark:text-black px-2 py-0.5">
                  Max 10 members
                </span>
              </div>

              {/* List of added emails */}
              {teamEmails.length > 0 && (
                <div className="space-y-2">
                  {teamEmails.map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center gap-2 bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 px-4 py-2"
                    >
                      <EnvelopeIcon className="size-4 text-[#A855F7] shrink-0" />
                      <span className="flex-1 font-bold text-sm text-gray-900 dark:text-white truncate">
                        {member.email}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTeamEmail(member.email)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XMarkIcon className="size-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add email input */}
              <div className="flex gap-4">
                <input
                  className="flex-1 bg-white dark:bg-black border-4 border-gray-200 dark:border-white/20 rounded-none px-4 py-3 text-xl font-bold text-gray-900 dark:text-white focus:ring-0 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] placeholder:text-gray-300 dark:placeholder:text-white/30 transition-all outline-none"
                  placeholder="teammate@hype.com"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTeamEmail();
                    }
                  }}
                  disabled={isLoading}
                />
                <div className="bg-gray-900 dark:bg-white text-[#ADFF2F] dark:text-black px-4 flex items-center border-4 border-gray-200 dark:border-white/20">
                  <EnvelopeIcon className="size-5 font-black" />
                </div>
              </div>

              <button
                className="w-full md:w-auto px-8 py-3 bg-[#ADFF2F] text-gray-900 border-4 border-gray-200 dark:border-white/20 rounded-none font-black uppercase tracking-tighter text-sm flex items-center justify-center gap-2 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all"
                type="button"
                onClick={addTeamEmail}
                disabled={isLoading}
              >
                <PlusCircleIcon className="size-5" />
                <span>Add Member</span>
              </button>
            </div>

            {/* Submit */}
            <div className="pt-8">
              <button
                className="w-full py-8 bg-[#A855F7] text-white text-3xl font-black uppercase tracking-tighter flex items-center justify-center gap-4 border-4 border-[#7c3aed] dark:border-white/20 shadow-[8px_8px_0px_0px_#7c3aed] md:shadow-[12px_12px_0px_0px_#7c3aed] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#7c3aed] md:hover:shadow-[16px_16px_0px_0px_#7c3aed] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                type="submit"
                disabled={!formik.isValid || !formik.dirty || isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={36} color="inherit" />
                ) : (
                  <>
                    <span>Create Organizer Profile</span>
                    <RocketLaunchIcon className="size-10" />
                  </>
                )}
              </button>
              <p className="text-center mt-6 text-sm font-bold uppercase text-gray-400 dark:text-white/40">
                By clicking, you agree to our Terms of Hype &amp; Chaos.
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white dark:bg-black border-t-4 border-gray-200 dark:border-white/10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="size-8 text-gray-900 dark:text-white">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              Hype
            </h2>
          </div>
          <div className="flex gap-8">
            <a
              className="text-gray-400 dark:text-white/40 hover:text-[#00bcd4] dark:hover:text-[#00F0FF] font-black uppercase text-xs transition-colors"
              href="#"
            >
              Twitter
            </a>
            <a
              className="text-gray-400 dark:text-white/40 hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] font-black uppercase text-xs transition-colors"
              href="#"
            >
              Instagram
            </a>
            <a
              className="text-gray-400 dark:text-white/40 hover:text-[#A855F7] font-black uppercase text-xs transition-colors"
              href="#"
            >
              Discord
            </a>
          </div>
          <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest">
            © 2024 HYPE EXPERIENCES INC.
          </p>
        </div>
      </footer>

      {/* Toast */}
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

export default RegisterOrganizerView;
