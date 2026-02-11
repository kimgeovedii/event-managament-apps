"use client";

import React from "react";
import Link from "next/link";
import { useRegisterForm } from "../hooks";
import {
  UserIcon,
  EmailIcon,
  LockIcon,
  EyeIcon,
  EyeSlashIcon,
  TicketIcon,
  CheckIcon,
  GoogleIcon,
} from "./ui/Icons";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

const RegisterForm: React.FC = () => {
  const {
    formik,
    showPassword,
    togglePasswordVisibility,
    isLoading,
    toast,
    handleCloseToast,
  } = useRegisterForm();

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-6 relative z-10">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-1 uppercase tracking-tighter leading-none italic drop-shadow-[2px_2px_0px_#ee2b8c] dark:drop-shadow-[2px_2px_0px_#FF00FF]">
          Join The Squad
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wide">
          Start earning rewards and get exclusive access.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <label className="flex flex-col gap-1.5">
          <span className="text-black dark:text-white text-xs font-black uppercase tracking-wider">
            Full Name
          </span>
          <div className="relative flex items-center group">
            <span className="absolute left-3 z-10 text-gray-400 group-focus-within:text-[#ee2b8c] dark:group-focus-within:text-[#FF00FF] transition-colors">
              <UserIcon />
            </span>
            <input
              className="w-full h-11 pl-10 pr-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-zinc-800 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] focus:outline-none text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_#ee2b8c] dark:focus:shadow-[4px_4px_0px_0px_#FF00FF] disabled:opacity-50 disabled:cursor-not-allowed"
              id="name"
              placeholder="ENTER FULL NAME"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 font-bold uppercase text-[10px] px-1">
              {formik.errors.name}
            </span>
          )}
        </label>

        {/* Email */}
        <label className="flex flex-col gap-1.5">
          <span className="text-black dark:text-white text-xs font-black uppercase tracking-wider">
            Email Address
          </span>
          <div className="relative flex items-center group">
            <span className="absolute left-3 z-10 text-gray-400 group-focus-within:text-[#ee2b8c] dark:group-focus-within:text-[#FF00FF] transition-colors">
              <EmailIcon />
            </span>
            <input
              className="w-full h-11 pl-10 pr-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-zinc-800 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] focus:outline-none text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_#ee2b8c] dark:focus:shadow-[4px_4px_0px_0px_#FF00FF] disabled:opacity-50 disabled:cursor-not-allowed"
              id="email"
              placeholder="NAME@EXAMPLE.COM"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 font-bold uppercase text-[10px] px-1">
              {formik.errors.email}
            </span>
          )}
        </label>

        {/* Password */}
        <label className="flex flex-col gap-1.5">
          <span className="text-black dark:text-white text-xs font-black uppercase tracking-wider">
            Password
          </span>
          <div className="relative flex items-center group">
            <span className="absolute left-3 z-10 text-gray-400 group-focus-within:text-[#ee2b8c] dark:group-focus-within:text-[#FF00FF] transition-colors">
              <LockIcon />
            </span>
            <input
              className="w-full h-11 pl-10 pr-10 bg-white dark:bg-black border-2 border-gray-200 dark:border-zinc-800 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] focus:outline-none text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_#ee2b8c] dark:focus:shadow-[4px_4px_0px_0px_#FF00FF] disabled:opacity-50 disabled:cursor-not-allowed"
              id="password"
              placeholder="CREATE PASSWORD"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
            <button
              className="absolute right-3 z-10 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 disabled:cursor-not-allowed"
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 font-bold uppercase text-[10px] px-1">
              {formik.errors.password}
            </span>
          )}
        </label>

        {/* Referral Code */}
        <label className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-black dark:text-white text-xs font-black uppercase tracking-wider">
              Referral Code{" "}
              <span className="font-bold text-gray-400">(Optional)</span>
            </span>
            <span className="text-[10px] font-black text-[#ee2b8c] dark:text-[#FF00FF] uppercase tracking-wider animate-pulse bg-black dark:bg-white text-white dark:text-black px-1.5 py-0.5 transform -rotate-2">
              Bonus Points!
            </span>
          </div>
          <div className="relative flex items-center group">
            <span className="absolute left-3 z-10 text-[#ee2b8c] dark:text-[#FF00FF]">
              <TicketIcon />
            </span>
            <input
              className="w-full h-11 pl-10 pr-3 bg-[#ee2b8c]/5 dark:bg-[#FF00FF]/10 border-2 border-dashed border-[#ee2b8c]/50 dark:border-[#FF00FF]/50 focus:border-[#ee2b8c] dark:focus:border-[#FF00FF] focus:outline-none text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all font-bold text-sm shadow-[2px_2px_0px_0px_rgba(238,43,140,0.1)] focus:shadow-[4px_4px_0px_0px_#ee2b8c] dark:focus:shadow-[4px_4px_0px_0px_#FF00FF] disabled:opacity-50 disabled:cursor-not-allowed"
              id="referralCode"
              placeholder="HYPE-2023"
              type="text"
              name="referralCode"
              value={formik.values.referralCode}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
          </div>
        </label>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 mt-1 cursor-pointer group select-none">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              className="peer h-5 w-5 cursor-pointer appearance-none border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-black checked:border-[#ee2b8c] dark:checked:border-[#FF00FF] checked:bg-[#ee2b8c] dark:checked:bg-[#FF00FF] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
              type="checkbox"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              disabled={isLoading}
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transform scale-75">
              <CheckIcon />
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
            I agree to the{" "}
            <Link
              href="#"
              className="text-black dark:text-white underline decoration-2 underline-offset-2 decoration-[#ee2b8c] dark:decoration-[#FF00FF] hover:text-[#ee2b8c] dark:hover:text-[#FF00FF]"
            >
              Terms & Conditions
            </Link>
          </span>
        </label>
        {formik.touched.terms && formik.errors.terms && (
          <span className="text-red-500 font-bold uppercase text-[10px] px-1">
            {formik.errors.terms}
          </span>
        )}

        {/* Submit Button */}
        <button
          className="mt-2 w-full h-12 bg-[#ee2b8c] hover:bg-[#d61f7a] dark:bg-[#FF00FF] dark:hover:bg-[#d900d9] text-white dark:text-black text-sm font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[2px_2px_0px_0px_#000000] dark:hover:shadow-[2px_2px_0px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
          type="submit"
          disabled={!formik.isValid || !formik.dirty || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Start Earning Rewards"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t-2 border-dashed border-gray-300 dark:border-zinc-800"></div>
        <span className="flex-shrink-0 mx-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
          Or continue with
        </span>
        <div className="flex-grow border-t-2 border-dashed border-gray-300 dark:border-zinc-800"></div>
      </div>

      {/* Social Login */}
      <div className="flex flex-col gap-4">
        <button className="flex items-center justify-center gap-2 h-11 border-2 border-gray-200 dark:border-zinc-800 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors text-black dark:text-white font-bold text-xs uppercase tracking-wide shadow-[2px_2px_0px_0px_#ccc] dark:shadow-[2px_2px_0px_0px_#333] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] w-full">
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      {/* Snackbar for Feedback */}
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

export default RegisterForm;
