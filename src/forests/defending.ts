import { createTree } from "@/lib/graph";

export const defendingTrees = [
  createTree([
    {
      activationCost: 1,
      parentIds: [],
      row: 0,
      column: 0,
      actions: [{ attribute: "interceptions", value: 2 }],
    },
    {
      activationCost: 1,
      parentIds: [],
      row: 0,
      column: 1,
      actions: [{ attribute: "slidingTackle", value: 2 }],
    },
    {
      activationCost: 1,
      parentIds: [],
      row: 0,
      column: 2,
      actions: [{ attribute: "standingTackle", value: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["A1"],
      row: 1,
      column: 0,
      actions: [
        { attribute: "interceptions", value: 2 },
        { attribute: "defensiveAwareness", value: 1 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["B1"],
      row: 1,
      column: 1,
      actions: [
        { attribute: "defensiveAwareness", value: 1 },
        { attribute: "slidingTackle", value: 2 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["C1"],
      row: 1,
      column: 2,
      actions: [
        { attribute: "defensiveAwareness", value: 1 },
        { attribute: "standingTackle", value: 2 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["A2"],
      row: 2,
      column: 0,
      actions: [{ attribute: "interceptions", value: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["B2"],
      row: 2,
      column: 1,
      actions: [{ attribute: "slidingTackle", value: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["C2"],
      row: 2,
      column: 2,
      actions: [{ attribute: "standingTackle", value: 2 }],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 0,
      actions: [
        { attribute: "interceptions", value: 3 },
        { attribute: "defensiveAwareness", value: 1 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 1,
      actions: [
        { attribute: "defensiveAwareness", value: 1 },
        { attribute: "slidingTackle", value: 2 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 2,
      actions: [
        { attribute: "defensiveAwareness", value: 1 },
        { attribute: "standingTackle", value: 2 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 0,
      actions: [
        { attribute: "interceptions", value: 3 },
        { attribute: "defensiveAwareness", value: 2 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 1,
      actions: [
        { attribute: "defensiveAwareness", value: 2 },
        { attribute: "slidingTackle", value: 3 },
      ],
    },
    {
      activationCost: 4,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 2,
      actions: [
        { attribute: "defensiveAwareness", value: 3 },
        { attribute: "standingTackle", value: 3 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A5"],
      row: 5,
      column: 0,
      actions: [
        { attribute: "interceptions", value: 3 },
        { attribute: "defensiveAwareness", value: 1 },
      ],
    },
    {
      activationCost: 5,
      parentIds: ["B5"],
      row: 5,
      column: 1,
      actions: [
        { attribute: "slidingTackle", value: 3 },
        { attribute: "standingTackle", value: 3 },
      ],
    },
  ]),
];
