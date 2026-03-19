"use client";
import { useState } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "@/app/resume/lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "@/app/resume/lib/redux/settingsSlice";
import { ProfileForm } from "@/app/resume/components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "@/app/resume/components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "@/app/resume/components/ResumeForm/EducationsForm";
import { ProjectsForm } from "@/app/resume/components/ResumeForm/ProjectsForm";
import { SkillsForm } from "@/app/resume/components/ResumeForm/SkillsForm";
import { ThemeForm } from "@/app/resume/components/ResumeForm/ThemeForm";
import { CustomForm } from "@/app/resume/components/ResumeForm/CustomForm";
import { FlexboxSpacer } from "@/app/resume/components/FlexboxSpacer";
import { cx } from "@/app/resume/lib/cx";

const formTypeToComponent: { [type in ShowForm]: React.ComponentType } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx(
        "flex justify-center scrollbar-thin scrollbar-track-gray-100 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
        isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100"
      )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form];
          return <Component key={form} />;
        })}
        <ThemeForm />
        <br />
      </section>
      <FlexboxSpacer maxWidth={50} className="hidden md:block" />
    </div>
  );
};
