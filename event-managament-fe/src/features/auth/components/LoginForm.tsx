"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLoginForm } from "../hooks";
import { 
  BoltIcon, 
  EmailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ArrowRightIcon, 
  ChevronRightIcon, 
  CheckIcon 
} from "./ui/Icons";

const LoginForm: React.FC = () => {
  const { formik, showPassword, togglePasswordVisibility } = useLoginForm();

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-7 w-7 rounded-lg bg-[#ee2b8c] flex items-center justify-center text-white">
            <BoltIcon />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#181114] dark:text-white">
            Hype
          </span>
        </div>
        <h2 className="text-[#181114] dark:text-white text-2xl font-black leading-tight tracking-tight">
          Log In to Hype
        </h2>
        <p className="text-[#896175] dark:text-gray-300 text-sm font-normal">
          Welcome back! Please enter your details.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        {/* Email Field */}
        <label className="flex flex-col gap-1">
          <span className="text-[#181114] dark:text-white text-xs font-semibold">
            Email Address
          </span>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10 text-[#896175] dark:text-gray-400">
              <EmailIcon />
            </span>
            <input
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-[#f8f6f7] dark:bg-[#3a1d2e] border border-[#e6dbe0] dark:border-[#4a2d3e] focus:border-[#ee2b8c] focus:outline-none text-[#181114] dark:text-white placeholder:text-[#896175] dark:placeholder:text-gray-400 transition-all font-medium text-sm"
              id="email"
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-[10px] px-1">{formik.errors.email}</span>
          )}
        </label>

        {/* Password Field */}
        <label className="flex flex-col gap-1">
          <span className="text-[#181114] dark:text-white text-xs font-semibold">
            Password
          </span>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10 text-[#896175] dark:text-gray-400">
              <LockIcon />
            </span>
            <input
              className="w-full h-10 pl-10 pr-10 rounded-lg bg-[#f8f6f7] dark:bg-[#3a1d2e] border border-[#e6dbe0] dark:border-[#4a2d3e] focus:border-[#ee2b8c] focus:outline-none text-[#181114] dark:text-white placeholder:text-[#896175] dark:placeholder:text-gray-400 transition-all font-medium text-sm"
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button
              className="absolute right-3 z-10 text-[#896175] dark:text-gray-400 hover:text-[#181114] dark:hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 text-[10px] px-1">{formik.errors.password}</span>
          )}
        </label>

        {/* Actions Row */}
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-start gap-2 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[#e6dbe0] dark:border-[#4a2d3e] bg-white dark:bg-[#3a1d2e] checked:border-[#ee2b8c] checked:bg-[#ee2b8c] transition-all"
                type="checkbox"
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                <CheckIcon />
              </span>
            </div>
            <span className="text-[#181114] dark:text-gray-200 text-xs font-medium group-hover:text-[#ee2b8c] transition-colors">
              Remember me
            </span>
          </label>
          <Link
            href="#"
            className="text-xs font-semibold text-[#ee2b8c] hover:text-[#d61f7a] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Primary Button */}
        <button
          className="mt-2 w-full h-11 bg-[#ee2b8c] hover:bg-[#d61f7a] text-white text-sm font-bold rounded-full shadow-lg shadow-[#ee2b8c]/30 hover:shadow-[#ee2b8c]/40 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
          type="submit"
        >
          <span>Sign In</span>
          <ArrowRightIcon />
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-[#e6dbe0] dark:border-[#4a2d3e]"></div>
        <span className="flex-shrink-0 mx-3 text-xs text-[#896175] dark:text-gray-400 font-medium uppercase tracking-wider">Or continue with</span>
        <div className="flex-grow border-t border-[#e6dbe0] dark:border-[#4a2d3e]"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-[#e6dbe0] dark:border-[#4a2d3e] bg-white dark:bg-[#3a1d2e] hover:bg-[#f8f6f7] dark:hover:bg-[#4a2d3e] transition-colors text-[#181114] dark:text-white font-semibold text-xs">
          <Image
            alt="Google Logo"
            className="w-4 h-4"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWKfWAJig2saHdYwZ70vVAbCoy4hr3MMw9KZ9xPNp88RNA6yo5iesLKK5gPn3NoQyDTTrCR3NA6473191U-pqgHSaq5-6y2yz5caAqcYRkjUjbORHHElYb_CcFxRNbpeKLaFFKF_l0ihkwBARk5Wwpk-ry-5uVA8Zo_XF7BZ1DlYACwlETgtlIperTjZ42xZqHq1DfNR1WEVHpFddeQgQ1TkvMiuI1Nwd-tFMHoB28jp68F1FCvtSb8hHJ-KhUwcAFMSR__EWnAQ"
            width={16}
            height={16}
          />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-[#e6dbe0] dark:border-[#4a2d3e] bg-white dark:bg-[#3a1d2e] hover:bg-[#f8f6f7] dark:hover:bg-[#4a2d3e] transition-colors text-[#181114] dark:text-white font-semibold text-xs">
          <Image
            alt="Apple Logo"
            className="w-4 h-4"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG8ZsZVlTFMzShmpKQvXVP6f3WYtO_uhbBxI6PZIF81bCJAgPoXFYAhLDlvxJ3LfYt1PetRNs8kE0Z4wcY6FTdTn5dOrbPSsutn__--hN8Baa5b746IGFuzPEsw5jE9WRQgU3VLRWjTvsB5pgG31MT6gAfTVEt6QlGH1E6gIsQkZE0pnQfsHb82i1brgrKXAWxTjduuoIv9Hc0MTEmGj8CZU_cX3_dRjSMKSjXZMrzujcMcNb4KljTt8icNLwgOGvwzlSbiRz9-mI"
            width={16}
            height={16}
          />
          Apple
        </button>
      </div>

      {/* Footer CTA */}
      <div className="mt-1 p-3 rounded-xl bg-[#f8f6f7] dark:bg-[#3a1d2e] border border-[#e6dbe0] dark:border-[#4a2d3e] text-center">
        <p className="text-[#181114] dark:text-white text-xs font-medium">
          New to Hype?
          <Link
            href="/register"
            className="font-bold text-[#ee2b8c] hover:text-[#d61f7a] ml-1 inline-flex items-center gap-1 group transition-colors"
          >
            Create an account
            <span className="group-hover:translate-x-0.5 transition-transform inline-block">
              <ChevronRightIcon />
            </span>
          </Link>
        </p>
        <p className="text-[10px] text-[#896175] dark:text-gray-400 mt-0.5 font-medium">
          Register now and get{" "}
          <span className="text-[#ee2b8c] font-bold">10,000 points</span> bonus!
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
