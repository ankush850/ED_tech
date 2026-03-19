import React, { useState } from "react";
import { INPUT_CLASS_NAME } from "@/app/resume/components/ResumeForm/Form/InputGroup";
import { cx } from "@/app/resume/lib/cx";

export const FeaturedSkillInput = ({
  skill,
  rating,
  setSkillRating,
  placeholder,
  className,
  circleColor,
}: {
  skill: string;
  rating: number;
  setSkillRating: (skill: string, rating: number) => void;
  placeholder: string;
  className?: string;
  circleColor?: string;
}) => {
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        value={skill}
        placeholder={placeholder}
        onChange={(e) => setSkillRating(e.target.value, rating)}
        className={INPUT_CLASS_NAME}
      />
      <CircleRating
        rating={rating}
        setRating={(newRating) => setSkillRating(skill, newRating)}
        circleColor={circleColor}
      />
    </div>
  );
};

const CircleRating = ({
  rating,
  setRating,
  circleColor = "#38bdf8",
}: {
  rating: number;
  setRating: (rating: number) => void;
  circleColor?: string;
}) => {
  const numCircles = 5;
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex items-center p-2">
      {[...Array(numCircles)].map((_, idx) => (
        <div
          className={`cursor-pointer p-0.5`}
          key={idx}
          onClick={() => setRating(idx)}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(null)}
        >
          <div
            className={cx(
              "h-4 w-4 rounded-full transition-all duration-300 hover:scale-[120%] shadow-sm",
              ((hoverRating !== null && hoverRating >= idx) ||
                (hoverRating === null && rating >= idx))
                ? ""
                : "ring-2 ring-inset ring-slate-200 bg-slate-50"
            )}
            style={{
              backgroundColor:
                (hoverRating !== null && hoverRating >= idx) ||
                (hoverRating === null && rating >= idx)
                  ? circleColor
                  : undefined,
            }}
          />
        </div>
      ))}
    </div>
  );
};
