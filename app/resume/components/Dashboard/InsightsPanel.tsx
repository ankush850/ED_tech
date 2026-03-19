"use client";
import React from "react";
import {
  CheckIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export const InsightsPanel = () => {
  return (
    <aside className="w-[280px] flex flex-col gap-4">
      {/* Resume Score Card */}
      <div className="bg-[#111827] rounded-2xl p-5 border border-[#1F2937] shadow-lg">
        <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <SparklesIcon className="h-4 w-4 text-indigo-400" />
          Resume Score
        </h3>
        <div className="flex flex-col items-center">
          <div className="relative h-20 w-20">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="text-[#1F2937] stroke-current"
                strokeWidth="6"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              <circle
                className="text-indigo-500 stroke-current"
                strokeWidth="6"
                strokeLinecap="round"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * 78) / 100}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">78</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 text-center leading-relaxed">
            Your resume is looking good! <span className="text-indigo-400">Add 3 more technical skills</span> to hit 90.
          </p>
        </div>
      </div>

      {/* Skill Match Card */}
      <div className="bg-[#111827] rounded-2xl p-5 border border-[#1F2937] shadow-lg">
        <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-400" />
          Skill Match
        </h3>
        <div className="flex flex-col gap-3">
          {[
            { name: "Frontend", level: 90, color: "bg-indigo-500" },
            { name: "UI/UX Design", level: 65, color: "bg-purple-500" },
            { name: "Public Speaking", level: 40, color: "bg-amber-500" },
          ].map((skill) => (
            <div key={skill.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-slate-400">{skill.name}</span>
                <span className="text-slate-300">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-[#1F2937] rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Checklist Card */}
      <div className="bg-[#111827] rounded-2xl p-5 border border-[#1F2937] shadow-lg">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Optimization</h3>
        <ul className="flex flex-col gap-3">
          {[
            { text: "Contact info added", done: true },
            { text: "Professional summary", done: true },
            { text: "Work experience", done: true },
            { text: "Quantifiable metrics", done: false },
            { text: "Keyword optimization", done: false },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className={`h-5 w-5 rounded-md flex items-center justify-center transition-colors ${
                item.done ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
              }`}>
                {item.done ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                )}
              </div>
              <span className={`text-[13px] ${item.done ? "text-slate-300" : "text-slate-500 line-through decoration-slate-600"}`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action */}
      <button className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-2">
        <SparklesIcon className="h-4 w-4" />
        AI Feature Suggest
      </button>
    </aside>
  );
};
