"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RectangleGroupIcon,
  DocumentDuplicateIcon,
  BriefcaseIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", href: "/resume", icon: RectangleGroupIcon },
  { name: "My Resumes", href: "/resume/resume-builder", icon: DocumentDuplicateIcon },
  { name: "Job Matches", href: "/resume/job-matches", icon: BriefcaseIcon },
  { name: "Analytics", href: "/resume/analytics", icon: ChartBarIcon },
  { name: "Settings", href: "/resume/settings", icon: Cog6ToothIcon },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-[#0B1220] p-6 flex flex-col z-50">
      {/* Logo */}
      <div className="mb-10 flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">LearnHub</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex h-[44px] items-center gap-3 rounded-[10px] px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-[#1E293B] text-white shadow-lg"
                  : "text-slate-400 hover:bg-[#1E293B]/50 hover:text-slate-200"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[15px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section (Bottom) */}
      <div className="mt-auto pt-6 border-t border-slate-800/50">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-full bg-slate-700 overflow-hidden ring-2 ring-slate-800">
            {/* User Avatar Placeholder */}
            <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-200">John Doe</span>
            <span className="text-[11px] text-slate-500">Premium Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
