import { createTree } from "@/lib/graph";

export const defendingTrees = [
  createTree([
    {
      baseActivationCost: 1,
      parentIds: [],
      row: 0,
      column: 0,
      modifiers: new Map([["interceptions", 2]]),
    },
    {
      baseActivationCost: 1,
      parentIds: [],
      row: 0,
      column: 1,
      modifiers: new Map([["slidingTackle", 2]]),
    },
    {
      baseActivationCost: 1,
      parentIds: [],
      row: 0,
      column: 2,
      modifiers: new Map([["standingTackle", 2]]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["A1"],
      row: 1,
      column: 0,
      modifiers: new Map([
        ["interceptions", 2],
        ["defAwareness", 1],
      ]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["B1"],
      row: 1,
      column: 1,
      modifiers: new Map([
        ["defAwareness", 1],
        ["slidingTackle", 2],
      ]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["C1"],
      row: 1,
      column: 2,
      modifiers: new Map([
        ["defAwareness", 1],
        ["standingTackle", 2],
      ]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["A2"],
      row: 2,
      column: 0,
      modifiers: new Map([["interceptions", 2]]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["B2"],
      row: 2,
      column: 1,
      modifiers: new Map([["slidingTackle", 2]]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["C2"],
      row: 2,
      column: 2,
      modifiers: new Map([["standingTackle", 2]]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 0,
      modifiers: new Map([
        ["interceptions", 3],
        ["defAwareness", 1],
      ]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 1,
      modifiers: new Map([
        ["defAwareness", 1],
        ["slidingTackle", 2],
      ]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A3", "B3", "C3"],
      row: 3,
      column: 2,
      modifiers: new Map([
        ["defAwareness", 1],
        ["standingTackle", 2],
      ]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 0,
      modifiers: new Map([
        ["interceptions", 3],
        ["defAwareness", 2],
      ]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 1,
      modifiers: new Map([
        ["defAwareness", 2],
        ["slidingTackle", 3],
      ]),
    },
    {
      baseActivationCost: 4,
      parentIds: ["A4", "B4", "C4"],
      row: 4,
      column: 2,
      modifiers: new Map([
        ["defAwareness", 3],
        ["standingTackle", 3],
      ]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A5"],
      row: 5,
      column: 0,
      modifiers: new Map([
        ["interceptions", 3],
        ["defAwareness", 1],
      ]),
    },
    {
      baseActivationCost: 5,
      parentIds: ["B5"],
      row: 5,
      column: 1,
      modifiers: new Map([
        ["slidingTackle", 3],
        ["standingTackle", 3],
      ]),
    },
  ]),
];
