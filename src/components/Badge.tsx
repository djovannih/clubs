import type { PropsWithChildren } from "react";
import React from "react";

export default function Badge({ children }: PropsWithChildren) {
  return (
    <span className="absolute right-0 top-0 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-node-locked text-xs font-bold ring-1 ring-text-muted">
      {children}
    </span>
  );
}
