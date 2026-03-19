import { IconButton } from "@/app/resume/components/Button";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
  TrashIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export const ShowIconButton = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const tooltipText = show ? "Hide section" : "Show section";
  const onClick = () => {
    setShow(!show);
  };
  const Icon = show ? EyeIcon : EyeSlashIcon;

  return (
    <IconButton onClick={onClick} tooltipText={tooltipText}>
      <Icon className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </IconButton>
  );
};

type MoveIconButtonType = "up" | "down";
export const MoveIconButton = ({
  type,
  size = "medium",
  onClick,
}: {
  type: MoveIconButtonType;
  size?: "small" | "medium";
  onClick: (type: MoveIconButtonType) => void;
}) => {
  const tooltipText = type === "up" ? "Move up" : "Move down";
  const sizeClassName = size === "medium" ? "h-6 w-6" : "h-4 w-4";
  const Icon = type === "up" ? ArrowSmallUpIcon : ArrowSmallDownIcon;

  return (
    <IconButton
      onClick={() => onClick(type)}
      tooltipText={tooltipText}
      size={size}
    >
      <Icon className={`${sizeClassName} text-slate-400 hover:text-slate-600 transition-colors`} aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </IconButton>
  );
};

export const DeleteIconButton = ({
  onClick,
  tooltipText,
}: {
  onClick: () => void;
  tooltipText: string;
}) => {
  return (
    <IconButton onClick={onClick} tooltipText={tooltipText} size="small">
      <TrashIcon className="h-4 w-4 text-slate-300 hover:text-red-500 transition-colors" aria-hidden="true" />
      <span className="sr-only">{tooltipText}</span>
    </IconButton>
  );
};

export const BulletListIconButton = ({
  onClick,
  showBulletPoints,
}: {
  onClick: (newShowBulletPoints: boolean) => void;
  showBulletPoints: boolean;
}) => {
  const tooltipText = showBulletPoints
    ? "Hide bullet points"
    : "Show bullet points";

  return (
    <IconButton
      onClick={() => onClick(!showBulletPoints)}
      tooltipText={tooltipText}
      size="small"
      className={showBulletPoints ? "!bg-slate-900 !text-white" : ""}
    >
      <ListBulletIcon
        className={`h-4 w-4 ${
          showBulletPoints ? "text-white" : "text-slate-400"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{tooltipText}</span>
    </IconButton>
  );
};
