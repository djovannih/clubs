import clsx from "clsx";
import { useState } from "react";
import AttributeTree from "./AttributeTree";

interface IdkProps {}

export default function Idk({}: IdkProps) {
  const tabs = [
    "Pace",
    "Shooting",
    "Passing",
    "Dribbling",
    "Defending",
    "Physical",
  ];

  const [activeTab, setActiveTab] = useState<string>();

  return (
    <>
      <div className="mb-8 grid grid-cols-3 justify-between bg-background">
        {tabs.map((tab) => (
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
    </>
  );
}
