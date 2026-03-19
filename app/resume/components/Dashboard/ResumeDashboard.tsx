"use client";
import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { InsightsPanel } from "./InsightsPanel";
import { ResumeForm } from "@/app/resume/components/ResumeForm";
import { Resume } from "@/app/resume/components/Resume";
import Image from "next/image";

export const ResumeDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200">
      <Sidebar />

      <div className="ml-[240px]">
        <TopBar />

        <main className="pt-[72px] p-8">
          {/* Main 3-Column Layout */}
          <div className="flex gap-6 items-start">

            {/* Left Column: Editor (360px) */}
            <div className="w-[360px] flex-shrink-0 h-[calc(100vh-140px)] overflow-y-auto pr-2 no-scrollbar custom-editor-column">
              <div className="flex flex-col gap-4">
                <ResumeForm />
              </div>
            </div>

            {/* Center Column: Preview (520px) */}
            <div className="w-[520px] flex-grow flex flex-col items-center">
              <div className="sticky top-[104px] w-full flex justify-center">
                <div
                  className="bg-white rounded-xl shadow-2xl shadow-black/40 overflow-hidden transform scale-[0.6] origin-top ring-1 ring-slate-800"
                  style={{ width: '794px', height: '1123px' }} // Approx A4 width
                >
                  <Resume />
                </div>
              </div>
            </div>

            {/* Right Column: Insights (280px) */}
            <div className="w-[280px] flex-shrink-0 sticky top-[104px]">
              <InsightsPanel />
            </div>

          </div>

          {/* Bottom Templates Section */}
          <section className="mt-12 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Choose a Template</h2>
                <p className="text-slate-500 text-sm">Select from our professionally designed, ATS-friendly templates.</p>
              </div>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors">
                View all templates →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Executive", type: "Professional", premium: false },
                { name: "Sleek Modern", type: "Minimalist", premium: true },
                { name: "Creative Edge", type: "Design", premium: true },
                { name: "Software Eng", type: "Tech", premium: false },
              ].map((template, i) => (
                <div key={i} className="group relative">
                  <div className="w-[220px] h-[280px] rounded-xl bg-[#111827] border border-[#1F2937] overflow-hidden group-hover:border-indigo-500/50 group-hover:shadow-xl group-hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                      <button className="bg-white text-black text-[13px] font-bold w-full py-2.5 rounded-lg shadow-lg">
                        Use This Template
                      </button>
                    </div>

                    {/* Placeholder for template thumbnail */}
                    <div className="h-full w-full bg-[#1e2942] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all scale-[1.02] group-hover:scale-100">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <span className="text-indigo-400 text-xs font-bold">{template.name.charAt(0)}</span>
                        </div>
                        <span className="text-[11px] font-bold text-indigo-400 tracking-widest uppercase">Select Template</span>
                      </div>
                    </div>

                    {template.premium && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20 uppercase z-20">
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors uppercase tracking-wide">{template.name}</h4>
                    <span className="text-xs text-slate-500">{template.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style jsx global>{`
        .custom-editor-column {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .custom-editor-column::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
