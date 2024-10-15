"use client";

import AttributesTree from "@/components/AttributesTree";
import { useState } from "react";

export default function Character() {
  const [tree, setTree] = useState<AttributeNode[][]>([
    [
      { id: "A1", row: 0, column: 0, parentsIds: [], selected: false },
      { id: "C1", row: 0, column: 2, parentsIds: [], selected: false },
    ],
    [
      {
        id: "A2",
        row: 1,
        column: 0,
        parentsIds: ["A1", "C1"],
        selected: false,
      },
      {
        id: "B2",
        row: 1,
        column: 1,
        parentsIds: ["A1", "C1"],
        selected: false,
      },
      {
        id: "C2",
        row: 1,
        column: 2,
        parentsIds: ["A1", "C1"],
        selected: false,
      },
    ],
    [
      {
        id: "A3",
        row: 2,
        column: 0,
        parentsIds: ["A2"],
        selected: false,
      },
      {
        id: "C3",
        row: 2,
        column: 2,
        parentsIds: ["C2"],
        selected: false,
      },
    ],
    [
      {
        id: "A4",
        row: 3,
        column: 0,
        parentsIds: ["A3", "C3"],
        selected: false,
      },
      {
        id: "B4",
        row: 3,
        column: 1,
        parentsIds: ["A3", "C3"],
        selected: false,
      },
      {
        id: "C4",
        row: 3,
        column: 2,
        parentsIds: ["A3", "C3"],
        selected: false,
      },
    ],
    [
      {
        id: "A5",
        row: 4,
        column: 0,
        parentsIds: ["A4"],
        selected: false,
      },
      {
        id: "B5",
        row: 4,
        column: 1,
        parentsIds: ["B4"],
        selected: false,
      },
      {
        id: "C5",
        row: 4,
        column: 2,
        parentsIds: ["C4"],
        selected: false,
      },
    ],
  ]);

  return (
    <div className="w-80 flex flex-col items-center mx-auto">
      <AttributesTree tree={tree} setTree={setTree} />
    </div>
  );
}
