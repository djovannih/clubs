"use client";

import Idk from "@/components/Idk";

export default function Home() {
  const attributes = [
    { name: "Pace", value: 70, maxValue: 99 },
    { name: "Shooting", value: 70, maxValue: 99 },
    { name: "Passing", value: 70, maxValue: 99 },
    { name: "Dribbling", value: 70, maxValue: 99 },
    { name: "Defending", value: 70, maxValue: 99 },
    { name: "Physical", value: 70, maxValue: 99 },
  ];

  return (
    <>
      <div className="rounded-lg bg-background p-6">
        <h2 className="mb-4 text-2xl font-bold">Attributes</h2>
        {attributes.map((attr) => (
          <div key={attr.name} className="mb-4">
            <div className="mb-1 flex justify-between">
              <span>{attr.name}</span>
              <span>{attr.value}</span>
            </div>
            <div className="bg-node-locked h-2.5 w-full rounded-full">
              <div
                className="bg-highlight-dark h-2.5 rounded-full"
                style={{ width: `${(attr.value / attr.maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <Idk />
    </>
  );
}
