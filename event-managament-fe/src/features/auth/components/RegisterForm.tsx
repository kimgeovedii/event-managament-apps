"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRegisterForm } from "../hooks";
import { 
  UserIcon, 
  EmailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  TicketIcon,
  CheckIcon 
} from "./ui/Icons";

const RegisterForm: React.FC = () => {
  const { formik, showPassword, togglePasswordVisibility } = useRegisterForm();

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-3">
      <div className="text-left mb-1">
        <h2 className="text-2xl font-bold text-[#181114] dark:text-white mb-1 tracking-tight">
          Create Account
        </h2>
        <p className="text-[#896175] dark:text-gray-400 text-sm">
          Join the community and start collecting rewards today.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        {/* Full Name */}
        <label className="flex flex-col gap-1">
          <span className="text-[#181114] dark:text-white text-xs font-semibold">Full Name</span>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10 text-[#896175] dark:text-gray-400">
              <UserIcon />
            </span>
            <input 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-[#f8f6f7] dark:bg-[#3a1d2e] border border-[#e6dbe0] dark:border-[#4a2d3e] focus:border-[#ee2b8c] focus:outline-none text-[#181114] dark:text-white placeholder:text-[#896175] dark:placeholder:text-gray-400 transition-all font-medium text-sm" 
              id="fullName"
              placeholder="Enter your full name" 
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <span className="text-red-500 text-[10px] px-1">{formik.errors.fullName}</span>
          )}
        </label>

        {/* Email */}
        <label className="flex flex-col gap-1">
          <span className="text-[#181114] dark:text-white text-xs font-semibold">Email Address</span>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10 text-[#896175] dark:text-gray-400">
              <EmailIcon />
            </span>
            <input 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-[#f8f6f7] dark:bg-[#3a1d2e] border border-[#e6dbe0] dark:border-[#4a2d3e] focus:border-[#ee2b8c] focus:outline-none text-[#181114] dark:text-white placeholder:text-[#896175] dark:placeholder:text-gray-400 transition-all font-medium text-sm" 
              id="email"
              placeholder="name@example.com" 
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

        {/* Password */}
        <label className="flex flex-col gap-1">
          <span className="text-[#181114] dark:text-white text-xs font-semibold">Password</span>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10 text-[#896175] dark:text-gray-400">
              <LockIcon />
            </span>
            <input 
              className="w-full h-10 pl-10 pr-10 rounded-lg bg-[#f8f6f7] dark:bg-[#3a1d2e] border border-[#e6dbe0] dark:border-[#4a2d3e] focus:border-[#ee2b8c] focus:outline-none text-[#181114] dark:text-white placeholder:text-[#896175] dark:placeholder:text-gray-400 transition-all font-medium text-sm" 
              id="password"
              placeholder="Create a password" 
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

        {/* Referral Code */}
        <label className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-[#181114] dark:text-white text-xs font-semibold">
              Referral Code <span className="font-normal text-[#896175] dark:text-gray-500">(Optional)</span>
            </span>
            <span className="text-[10px] font-bold text-[#ee2b8c] animate-pulse">Earn Bonus Points</span>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-3 z-10 text-[#ee2b8c]">
              <TicketIcon />
            </span>
            <input 
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-[#ee2b8c]/5 dark:bg-[#ee2b8c]/10 border border-dashed border-[#ee2b8c]/30 focus:border-[#ee2b8c] focus:outline-none text-[#181114] dark:text-white placeholder:text-[#896175] dark:placeholder:text-gray-400 transition-all font-medium text-sm" 
              id="referralCode"
              placeholder="HYPE-2023" 
              type="text"
              name="referralCode"
              value={formik.values.referralCode}
              onChange={formik.handleChange}
            />
          </div>
        </label>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-2 mt-1 cursor-pointer group select-none">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[#e6dbe0] dark:border-[#4a2d3e] bg-white dark:bg-[#3a1d2e] checked:border-[#ee2b8c] checked:bg-[#ee2b8c] transition-all" 
              type="checkbox"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
              <CheckIcon />
            </span>
          </div>
          <span className="text-xs text-[#5f4351] dark:text-gray-400 group-hover:text-[#181114] dark:group-hover:text-gray-200 transition-colors leading-tight">
             I agree to the <Link href="#" className="text-[#181114] dark:text-white underline decoration-[#ee2b8c]/50 hover:decoration-[#ee2b8c] font-medium">Terms & Conditions</Link> and <Link href="#" className="text-[#181114] dark:text-white underline decoration-[#ee2b8c]/50 hover:decoration-[#ee2b8c] font-medium">Privacy Policy</Link>.
          </span>
        </label>
        {formik.touched.terms && formik.errors.terms && (
          <span className="text-red-500 text-[10px] px-1">{formik.errors.terms}</span>
        )}

        {/* Submit Button */}
        <button 
          className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-4 bg-[#ee2b8c] hover:bg-[#d91b7a] active:bg-[#b01663] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-[#ee2b8c]/25 hover:shadow-[#ee2b8c]/40 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed" 
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
        >
          Start Earning Rewards
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-[#e6dbe0] dark:border-[#4a2d3e]"></div>
        <span className="flex-shrink-0 mx-3 text-xs text-[#896175] dark:text-gray-500 font-medium">Or continue with</span>
        <div className="flex-grow border-t border-[#e6dbe0] dark:border-[#4a2d3e]"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-[#e6dbe0] dark:border-[#4a2d3e] bg-white dark:bg-[#3a1d2e] hover:bg-[#f8f6f7] dark:hover:bg-[#4a2d3e] transition-colors text-[#181114] dark:text-white font-semibold text-xs">
          <Image 
            alt="Google Logo" 
            className="w-4 h-4" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSqLVR5FYUoUtKAiflF-IBXdq4c5Ua_zpdPRl3IVnsZAX0pSOsgUgAfBVdOeOClAMDeOFGgzPrX9dyWnCr-3iy2DOzDbQkNMbAnmaloesokhSMpteYKRc0sHR46YVQDaeIWqzqGnxs5HXBfwpWZBE86qh4e_15uyD8MfOFJtjjUe_WJ-6m2tQqA-jiSW_64EOkkwYBhr2B9jwURtbUeQ0clEjCerI4nQehgcF-soqcFBRVSNmu6sbS5WlqRikKgG8I72cuGPpRgyM" 
            width={16} 
            height={16} 
          />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 h-10 rounded-lg border border-[#e6dbe0] dark:border-[#4a2d3e] bg-white dark:bg-[#3a1d2e] hover:bg-[#f8f6f7] dark:hover:bg-[#4a2d3e] transition-colors text-[#181114] dark:text-white font-semibold text-xs">
          <Image 
            alt="Facebook Logo" 
            className="w-4 h-4" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLxn7NkMJo473nE-2slq9ARs8vrBtQgd0uU0AQjTNkWXFv4fnN0NyfAuMRUaxzUfFi7ZRSFdh82fmCfbP5t3Evs98SfMDi7V8HwN2z6JywcjHqhaZYl1Z_P3V_Bv8K6lAW2yDTjZL3n24bdI4P2_C0IAazMkxbKmCZ6fjDCgcmWwFBGpoW7aKfbC6lmgvZTmCQFw-FFLhbTvX82nIEx7Bg1FFwN8Kmt8sy43RTXj65LmHBGIw5w1F87KHKT-jrOtBf3Nrahj99IDU" 
            width={16} 
            height={16} 
          />
          Facebook
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
