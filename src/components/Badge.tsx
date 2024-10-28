import clsx from "clsx";
import type { PropsWithChildren } from "react";
import React from "react";

interface BadgeProps extends Readonly<PropsWithChildren> {
  active: boolean;
}
export default function Badge({ active, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "bg-slate-800 absolute right-0 top-0 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full text-xs font-bold ring-1",
        active ? "bg-green-600 ring-green-700 " : "bg-slate-800 ring-slate-500 ",
      )}
    >
      {children}
    </span>
  );
}
