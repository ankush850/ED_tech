import { BaseForm } from "@/app/resume/components/ResumeForm/Form";
import { InputGroupWrapper } from "@/app/resume/components/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "@/app/resume/components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "@/app/resume/components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
} from "@/app/resume/components/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  selectSettings,
  type GeneralSetting,
} from "@/app/resume/lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/app/resume/lib/redux/hooks";
import type { FontFamily } from "@/app/resume/components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  return (
    <BaseForm className="mb-12">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-900 text-white shadow-md shadow-slate-200">
            <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Appearance Settings
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Theme Color</h3>
          <div className="mt-3 flex flex-wrap gap-4">
            {THEME_COLORS.map((color, idx) => (
              <button
                key={idx}
                type="button"
                className={`group relative h-10 w-10 flex shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${settings.themeColor === color
                    ? "ring-2 ring-slate-900 ring-offset-2 shadow-lg"
                    : "hover:ring-2 hover:ring-slate-200 hover:ring-offset-2"
                  }`}
                style={{ backgroundColor: color }}
                onClick={() => handleSettingsChange("themeColor", color)}
                title={color}
              >
                {settings.themeColor === color && (
                  <div className="h-2 w-2 rounded-full bg-white shadow-sm ring-1 ring-black/10" />
                )}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <InlineInput
              label="Custom Color Code"
              name="themeColor"
              value={settings.themeColor}
              placeholder={DEFAULT_THEME_COLOR}
              onChange={handleSettingsChange}
              inputStyle={{ color: themeColor, fontWeight: 'bold' }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Typography</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Font Family</label>
              <FontFamilySelectionsCSR
                selectedFontFamily={fontFamily}
                themeColor={themeColor}
                handleSettingsChange={handleSettingsChange}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Standard Size</label>
              <FontSizeSelections
                fontFamily={fontFamily as FontFamily}
                themeColor={themeColor}
                selectedFontSize={fontSize}
                handleSettingsChange={handleSettingsChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Layout</h3>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Standard Page Size</label>
            <DocumentSizeSelections
              themeColor={themeColor}
              selectedDocumentSize={documentSize}
              handleSettingsChange={handleSettingsChange}
            />
          </div>
        </div>
      </div>
    </BaseForm>
  );
};
