import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState, type PropsWithChildren } from "react";

interface CollapsibleCardProps extends Readonly<PropsWithChildren> {
  heading: string;
  maxHeight: number;
}
export default function CollapsibleCard({
  heading,
  maxHeight,
  children,
}: CollapsibleCardProps) {
  const [collapseCard, setCollapseCard] = useState(false);

  return (
    <div className="flex flex-col rounded-lg bg-slate-800">
      <button
        className="flex items-center justify-between px-4 py-2"
        onClick={() => setCollapseCard(!collapseCard)}
      >
        <h2 className="text-xl font-bold">{heading}</h2>
        <ChevronDown
          className={clsx(
            "transition-transform duration-300",
            collapseCard ? "rotate-0" : "rotate-180",
          )}
        />
      </button>
      <div
        className={clsx(
          "flex flex-col gap-2 overflow-hidden px-4 transition-all duration-300 ease-in-out",
          !collapseCard && "py-4",
        )}
        style={{ maxHeight: collapseCard ? 0 : maxHeight }}
      >
        {children}
      </div>
    </div>
  );
}
