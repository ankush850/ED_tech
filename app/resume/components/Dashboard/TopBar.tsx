"use client";
import React from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export const TopBar = () => {
  return (
    <header className="fixed top-0 left-[240px] right-0 h-[72px] bg-[#0F172A]/80 backdrop-blur-md border-b border-[#1F2937] px-8 flex items-center justify-between z-40">
      {/* Search Bar */}
      <div className="relative group w-[320px]">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search resumes, jobs, resources..."
          className="h-10 w-full rounded-lg bg-[#111827] border-0 px-10 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 ring-1 ring-inset ring-[#1F2937] focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Help / Docs */}
        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-400 hover:text-slate-200 transition-colors">
          <span>Documentation</span>
        </button>

        {/* Notifications */}
        <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#111827] border border-[#1F2937] text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] transition-all relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0F172A]"></span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2 group p-1 rounded-full hover:bg-slate-800/50 transition-all">
          <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 overflow-hidden flex items-center justify-center">
             <UserCircleIcon className="h-7 w-7 text-indigo-400" />
          </div>
          <div className="hidden lg:flex flex-col items-start pr-2">
            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight">Admin-LearnHub</span>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Admin</span>
          </div>
        </button>
      </div>
    </header>
  );
};
