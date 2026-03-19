import { ExpanderWithHeightTransition } from "@/app/resume/components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "@/app/resume/components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "@/app/resume/lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
  ShowForm,
} from "@/app/resume/lib/redux/settingsSlice";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "@/app/resume/lib/redux/resumeSlice";

/**
 * BaseForm is the bare bone form, i.e. just the outline with no title and no control buttons.
 * ProfileForm uses this to compose its outline.
 */
export const BaseForm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`flex flex-col gap-4 rounded-xl bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${className}`}
  >
    {children}
  </section>
);

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
};

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm;
  addButtonText?: string;
  children: React.ReactNode;
}) => {
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));

  const dispatch = useAppDispatch();
  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }));
  };
  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const handleMoveClick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }));
  };

  const Icon = FORM_TO_ICON[form];

  return (
    <BaseForm
      className={`transition-all duration-300 ${
        showForm ? "pb-8" : "pb-4 opacity-70 scale-[0.99] grayscale-[0.2]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-3">
          <div className={`p-2 rounded-lg ${showForm ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full border-b border-transparent bg-transparent text-lg font-bold tracking-tight text-slate-900 outline-none hover:border-slate-200 focus:border-slate-900 transition-colors"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1">
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        <div className="mt-6">
          {children}
        </div>
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              dispatch(addSectionInForm({ form }));
            }}
            className="group flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusSmallIcon
              className="-ml-1 mr-2 h-5 w-5 text-slate-400 group-hover:text-white transition-colors"
              aria-hidden="true"
            />
            {addButtonText}
          </button>
        </div>
      )}
    </BaseForm>
  );
};

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm;
  idx: number;
  showMoveUp: boolean;
  showMoveDown: boolean;
  showDelete: boolean;
  deleteButtonTooltipText: string;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && (
        <div className="mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
      )}
      <div className="relative grid grid-cols-6 gap-3">
        {children}
        <div className={`absolute right-0 top-0 flex gap-0.5 `}>
          <div
            className={`transition-all duration-300 ${
              showMoveUp ? "" : "invisible opacity-0"
            } ${showMoveDown ? "" : "-mr-6"}`}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showMoveDown ? "" : "invisible opacity-0"
            }`}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showDelete ? "" : "invisible opacity-0"
            }`}
          >
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
