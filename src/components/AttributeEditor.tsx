"use client";

import { paceForestAtom } from "@/atoms/pace";
import { shootingForestAtom } from "@/atoms/shooting";
import AttributeForest from "@/components/AttributeForest";
import clsx from "clsx";
import { useState } from "react";

interface AttributeEditorProps {}

export default function AttributeEditor({}: AttributeEditorProps) {
  const forests = [
    "Pace",
    "Shooting",
    "Passing",
    "Dribbling",
    "Defending",
    "Physical",
  ];

  const [activeTab, setActiveTab] = useState(forests.at(0));

  const getActiveForest = () => {
    switch (activeTab) {
      case "Pace":
        return <AttributeForest forest={paceForestAtom} />;
      case "Shooting":
        return <AttributeForest forest={shootingForestAtom} />;
      default:
        console.error(`Unexpected value: ${activeTab}`);
        return <></>;
    }
  };

  return (
    <>
      <div className="my-8 grid grid-cols-3 justify-between bg-background">
        {forests.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "p-2",
              tab === activeTab ? "bg-highlight-dark" : "bg-node-locked",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      {getActiveForest()}
    </>
  );
}
