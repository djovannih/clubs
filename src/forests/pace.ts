import { createTree } from "@/lib/graph";

export const paceTrees = [
  createTree([
    {
      baseActivationCost: 2,
      parentIds: [],
      row: 0,
      column: 0,
      modifiers: new Map([["acceleration", 2]]),
    },
    {
      baseActivationCost: 2,
      parentIds: [],
      row: 0,
      column: 2,
      modifiers: new Map([["sprintSpeed", 2]]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["A1", "C1"],
      row: 1,
      column: 0,
      modifiers: new Map([["acceleration", 2]]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A1", "C1"],
      row: 1,
      column: 1,
      modifiers: new Map([
        ["acceleration", 1],
        ["sprintSpeed", 1],
      ]),
    },
    {
      baseActivationCost: 2,
      parentIds: ["A1", "C1"],
      row: 1,
      column: 2,
      modifiers: new Map([["sprintSpeed", 2]]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A2"],
      row: 2,
      column: 0,
      modifiers: new Map([["acceleration", 2]]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["C2"],
      row: 2,
      column: 2,
      modifiers: new Map([["sprintSpeed", 2]]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A3", "C3"],
      row: 3,
      column: 0,
      modifiers: new Map([["acceleration", 2]]),
    },
    {
      baseActivationCost: 4,
      parentIds: ["A3", "C3"],
      row: 3,
      column: 1,
      modifiers: new Map([
        ["acceleration", 1],
        ["sprintSpeed", 1],
      ]),
    },
    {
      baseActivationCost: 3,
      parentIds: ["A3", "C3"],
      row: 3,
      column: 2,
      modifiers: new Map([["sprintSpeed", 2]]),
    },
    {
      baseActivationCost: 4,
      parentIds: ["A4"],
      row: 4,
      column: 0,
      modifiers: new Map([["acceleration", 3]]),
    },
    {
      baseActivationCost: 5,
      parentIds: ["B4"],
      row: 4,
      column: 1,
      modifiers: new Map([
        ["acceleration", 2],
        ["sprintSpeed", 2],
      ]),
    },
    {
      baseActivationCost: 4,
      parentIds: ["C4"],
      row: 4,
      column: 2,
      modifiers: new Map([["sprintSpeed", 2]]),
    },
  ]),
];
