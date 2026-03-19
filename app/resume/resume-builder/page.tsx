"use client";
import { Provider } from "react-redux";
import { store } from "@/app/resume/lib/redux/store";
import { ResumeForm } from "@/app/resume/components/ResumeForm";
import { Resume } from "@/app/resume/components/Resume";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="relative min-h-screen w-full overflow-hidden bg-slate-50/50">
        <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-3 h-full overflow-y-auto no-scrollbar border-r border-slate-200/60 bg-white/40 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto py-8">
               <ResumeForm />
            </div>
          </div>
          <div className="lg:col-span-3 h-full bg-slate-100/30 flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
            <div className="w-full max-w-4xl shadow-2xl shadow-slate-200/50 rounded-xl overflow-hidden bg-white ring-1 ring-slate-200/50">
              <Resume />
            </div>
          </div>
        </div>
      </main>
    </Provider>
  );
}
