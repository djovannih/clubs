"use client";

import AttributesTree from "@/components/AttributesTree";
import { useState } from "react";

export default function Character() {
  const [tree, setTree] = useState<AttributeNode[][]>([
    [
      { id: "A1", row: 0, column: 0, parentsIds: [], selected: false },
      { id: "B1", row: 0, column: 1, parentsIds: [], selected: false },
    ],
    [
      {
        id: "A2",
        row: 1,
        column: 0,
        parentsIds: ["A1"],
        selected: false,
      },
      {
        id: "B2",
        row: 1,
        column: 1,
        parentsIds: ["B1"],
        selected: false,
      },
      {
        id: "C2",
        row: 1,
        column: 2,
        parentsIds: ["B1"],
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
        id: "B3",
        row: 2,
        column: 1,
        parentsIds: ["B2"],
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
        parentsIds: ["A3"],
        selected: false,
      },
      {
        id: "B4",
        row: 3,
        column: 1,
        parentsIds: ["B3"],
        selected: false,
      },
      {
        id: "C4",
        row: 3,
        column: 2,
        parentsIds: ["C3"],
        selected: false,
      },
    ],
    [
      {
        id: "A5",
        row: 4,
        column: 0,
        parentsIds: ["A4", "B4", "C4"],
        selected: false,
      },
      {
        id: "B5",
        row: 4,
        column: 1,
        parentsIds: ["A4", "B4", "C4"],
        selected: false,
      },
      {
        id: "C5",
        row: 4,
        column: 2,
        parentsIds: ["A4", "B4", "C4"],
        selected: false,
      },
    ],
    [
      {
        id: "B6",
        row: 5,
        column: 1,
        parentsIds: ["B5"],
        selected: false,
      },
    ],
  ]);

  return (
    <div className="mx-auto flex w-80 flex-col items-center">
      <AttributesTree tree={tree} setTree={setTree} />
    </div>
  );
}
