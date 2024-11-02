import { createTree } from "@/lib/graph";

export const defendingTrees = [
  createTree([
    {
      activationCost: 1,
      parentIds: [],
      row: 0,
      column: 0,
      modifiers: [{ attributeName: "interceptions", updateValue: 2 }],
    },
    {
      activationCost: 1,
      parentIds: [],
      row: 0,
      column: 1,
      modifiers: [{ attributeName: "slidingTackle", updateValue: 2 }],
    },
    {
      activationCost: 1,
      parentIds: [],
      row: 0,
      column: 2,
      modifiers: [{ attributeName: "standingTackle", updateValue: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["A1"],
      row: 1,
      column: 0,
      modifiers: [
        { attributeName: "interceptions", updateValue: 2 },
        { attributeName: "defAwareness", updateValue: 1 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["B1"],
      row: 1,
      column: 1,
      modifiers: [
        { attributeName: "defAwareness", updateValue: 1 },
        { attributeName: "slidingTackle", updateValue: 2 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["C1"],
      row: 1,
      column: 2,
      modifiers: [
        { attributeName: "defAwareness", updateValue: 1 },
        { attributeName: "standingTackle", updateValue: 2 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["A2"],
      row: 2,
      column: 0,
      modifiers: [{ attributeName: "interceptions", updateValue: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["B2"],
      row: 2,
      column: 1,
      modifiers: [{ attributeName: "slidingTackle", updateValue: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["C2"],
      row: 2,
      column: 2,
      modifiers: [{ attributeName: "standingTackle", updateValue: 2 }],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 0,
      modifiers: [
        { attributeName: "interceptions", updateValue: 3 },
        { attributeName: "defAwareness", updateValue: 1 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 1,
      modifiers: [
        { attributeName: "defAwareness", updateValue: 1 },
        { attributeName: "slidingTackle", updateValue: 2 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 2,
      modifiers: [
        { attributeName: "defAwareness", updateValue: 1 },
        { attributeName: "standingTackle", updateValue: 2 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 0,
      modifiers: [
        { attributeName: "interceptions", updateValue: 3 },
        { attributeName: "defAwareness", updateValue: 2 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 1,
      modifiers: [
        { attributeName: "defAwareness", updateValue: 2 },
        { attributeName: "slidingTackle", updateValue: 3 },
      ],
    },
    {
      activationCost: 4,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 2,
      modifiers: [
        { attributeName: "defAwareness", updateValue: 3 },
        { attributeName: "standingTackle", updateValue: 3 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A5"],
      row: 5,
      column: 0,
      modifiers: [
        { attributeName: "interceptions", updateValue: 3 },
        { attributeName: "defAwareness", updateValue: 1 },
      ],
    },
    {
      activationCost: 5,
      parentIds: ["B5"],
      row: 5,
      column: 1,
      modifiers: [
        { attributeName: "slidingTackle", updateValue: 3 },
        { attributeName: "standingTackle", updateValue: 3 },
      ],
    },
  ]),
];
