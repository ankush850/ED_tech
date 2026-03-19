import { Form } from "@/app/resume/components/ResumeForm/Form";
import { BulletListIconButton } from "@/app/resume/components/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "@/app/resume/components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "@/app/resume/lib/redux/hooks";
import { changeCustom, selectCustom } from "@/app/resume/lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "@/app/resume/lib/redux/settingsSlice";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Custom Textbox"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute right-0 top-0">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
