import { BaseForm } from "@/app/resume/components/ResumeForm/Form";
import { Input, Textarea } from "@/app/resume/components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "@/app/resume/lib/redux/hooks";
import { changeProfile, selectProfile } from "@/app/resume/lib/redux/resumeSlice";
import { ResumeProfile } from "@/app/resume/lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-slate-900 text-white shadow-md shadow-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Personal Details</h2>
      </div>
      <div className="grid grid-cols-6 gap-x-4 gap-y-5 mt-4">
        <Input
          label="Full Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Professional Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email Address"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone Number"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Portfolio / LinkedIn"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
