"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A simple Tooltip component that shows tooltip text center below children on hover and on focus
 *
 * @example
 * <Tooltip text="Tooltip Text">
 *   <div>Hello</div>
 * </Tooltip>
 */
export const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const [show, setShow] = useState(false);
  const showTooltip = () => setShow(true);
  const hideTooltip = () => setShow(false);

  // Hook to set tooltip position to be right below children and centered
  useEffect(() => {
    const span = spanRef.current;
    const tooltip = tooltipRef.current;
    if (span && tooltip) {
      const rect = span.getBoundingClientRect();
      const TOP_OFFSET = 6;
      const newTop = rect.top + rect.height + TOP_OFFSET;
      const newLeft = rect.left - tooltip.offsetWidth / 2 + rect.width / 2;
      setTooltipPos({
        top: newTop,
        left: newLeft,
      });
    }
  }, [show]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      // hide tooltip onClick to handle the edge case where the element position is changed after lick
      onClick={hideTooltip}
    >
      {children}
      {show &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className="absolute left-0 top-0 z-50 w-max rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl ring-1 ring-white/10 backdrop-blur-sm transition-opacity duration-200"
            style={{
              left: `${tooltipPos.left}px`,
              top: `${tooltipPos.top}px`,
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  );
};
