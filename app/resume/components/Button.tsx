import { cx } from "@/app/resume/lib/cx";
import { Tooltip } from "@/app/resume/components/Tooltip";

type ReactButtonProps = React.ComponentProps<"button">;
type ReactAnchorProps = React.ComponentProps<"a">;
type ButtonProps = ReactButtonProps | ReactAnchorProps;

const isAnchor = (props: ButtonProps): props is ReactAnchorProps => {
  return "href" in props;
};

export const Button = (props: ButtonProps) => {
  if (isAnchor(props)) {
    return <a {...props} />;
  } else {
    return <button type="button" {...props} />;
  }
};

export const PrimaryButton = ({ className, ...props }: ButtonProps) => (
  <Button className={cx("btn-primary", className)} {...props} />
);

type IconButtonProps = ButtonProps & {
  size?: "small" | "medium";
  tooltipText: string;
};

export const IconButton = ({
  className,
  size = "medium",
  tooltipText,
  ...props
}: IconButtonProps) => (
  <Tooltip text={tooltipText}>
    <Button
      type="button"
      className={cx(
        "rounded-lg outline-none hover:bg-slate-100 focus-visible:bg-slate-100 transition-colors duration-200",
        size === "medium" ? "p-2" : "p-1",
        className
      )}
      {...props}
    />
  </Tooltip>
);
