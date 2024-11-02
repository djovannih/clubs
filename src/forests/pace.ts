import { createTree } from "@/lib/graph";

export const paceTrees = [
  createTree([
    {
      activationCost: 2,
      parentIds: [],
      row: 0,
      column: 0,
      modifiers: [{ attributeName: "acceleration", updateValue: 2 }],
    },
    {
      activationCost: 2,
      parentIds: [],
      row: 0,
      column: 2,
      modifiers: [{ attributeName: "sprintSpeed", updateValue: 2 }],
    },
    {
      activationCost: 2,
      parentIds: ["A1", "C1"],
      row: 1,
      column: 0,
      modifiers: [{ attributeName: "acceleration", updateValue: 2 }],
    },
    {
      activationCost: 3,
      parentIds: ["A1", "C1"],
      row: 1,
      column: 1,
      modifiers: [
        { attributeName: "acceleration", updateValue: 1 },
        { attributeName: "sprintSpeed", updateValue: 1 },
      ],
    },
    {
      activationCost: 2,
      parentIds: ["A1", "C1"],
      row: 1,
      column: 2,
      modifiers: [{ attributeName: "sprintSpeed", updateValue: 2 }],
    },
    {
      activationCost: 3,
      parentIds: ["A2"],
      row: 2,
      column: 0,
      modifiers: [{ attributeName: "acceleration", updateValue: 2 }],
    },
    {
      activationCost: 3,
      parentIds: ["C2"],
      row: 2,
      column: 2,
      modifiers: [{ attributeName: "sprintSpeed", updateValue: 2 }],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "C3"],
      row: 3,
      column: 0,
      modifiers: [{ attributeName: "acceleration", updateValue: 2 }],
    },
    {
      activationCost: 4,
      parentIds: ["A3", "C3"],
      row: 3,
      column: 1,
      modifiers: [
        { attributeName: "acceleration", updateValue: 1 },
        { attributeName: "sprintSpeed", updateValue: 1 },
      ],
    },
    {
      activationCost: 3,
      parentIds: ["A3", "C3"],
      row: 3,
      column: 2,
      modifiers: [{ attributeName: "sprintSpeed", updateValue: 2 }],
    },
    {
      activationCost: 4,
      parentIds: ["A4"],
      row: 4,
      column: 0,
      modifiers: [{ attributeName: "acceleration", updateValue: 3 }],
    },
    {
      activationCost: 5,
      parentIds: ["B4"],
      row: 4,
      column: 1,
      modifiers: [
        { attributeName: "acceleration", updateValue: 2 },
        { attributeName: "sprintSpeed", updateValue: 2 },
      ],
    },
    {
      activationCost: 4,
      parentIds: ["C4"],
      row: 4,
      column: 2,
      modifiers: [{ attributeName: "sprintSpeed", updateValue: 2 }],
    },
  ]),
];
