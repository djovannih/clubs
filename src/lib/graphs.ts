import { Graph } from "@/lib/graph";

export const paceGraph: Graph[] = [
  new Map([
    [
      "A1",
      {
        id: "A1",
        activationCost: 99,
        isActive: false,
        parentIds: [],
        row: 0,
        column: 0,
      },
    ],
    [
      "C1",
      {
        id: "C1",
        activationCost: 99,
        isActive: false,
        parentIds: [],
        row: 0,
        column: 2,
      },
    ],
    [
      "A2",
      {
        id: "A2",
        activationCost: 99,
        isActive: false,
        parentIds: ["A1", "C1"],
        row: 1,
        column: 0,
      },
    ],
    [
      "B2",
      {
        id: "B2",
        activationCost: 99,
        isActive: false,
        parentIds: ["A1", "C1"],
        row: 1,
        column: 1,
      },
    ],
    [
      "C2",
      {
        id: "C2",
        activationCost: 99,
        isActive: false,
        parentIds: ["A1", "C1"],
        row: 1,
        column: 2,
      },
    ],
    [
      "A3",
      {
        id: "A3",
        activationCost: 99,
        isActive: false,
        parentIds: ["A2"],
        row: 2,
        column: 0,
      },
    ],
    [
      "C3",
      {
        id: "C3",
        activationCost: 99,
        isActive: false,
        parentIds: ["C2"],
        row: 2,
        column: 2,
      },
    ],
    [
      "A4",
      {
        id: "A4",
        activationCost: 99,
        isActive: false,
        parentIds: ["A3", "C3"],
        row: 3,
        column: 0,
      },
    ],
    [
      "B4",
      {
        id: "B4",
        activationCost: 99,
        isActive: false,
        parentIds: ["A3", "C3"],
        row: 3,
        column: 1,
      },
    ],
    [
      "C4",
      {
        id: "C4",
        activationCost: 99,
        isActive: false,
        parentIds: ["A3", "C3"],
        row: 3,
        column: 2,
      },
    ],
    [
      "A5",
      {
        id: "A5",
        activationCost: 99,
        isActive: false,
        parentIds: ["A4"],
        row: 4,
        column: 0,
      },
    ],
    [
      "B5",
      {
        id: "B5",
        activationCost: 99,
        isActive: false,
        parentIds: ["B4"],
        row: 4,
        column: 1,
      },
    ],
    [
      "C5",
      {
        id: "C5",
        activationCost: 99,
        isActive: false,
        parentIds: ["C4"],
        row: 4,
        column: 2,
      },
    ],
  ]),
];

export const shootingGraph: Graph[] = [
  new Map([
    [
      "A1",
      {
        id: "A1",
        activationCost: 99,
        isActive: false,
        parentIds: [],
        row: 0,
        column: 0,
      },
    ],
    [
      "B1",
      {
        id: "B1",
        activationCost: 99,
        isActive: false,
        parentIds: [],
        row: 0,
        column: 1,
      },
    ],
    [
      "A2",
      {
        id: "A2",
        activationCost: 99,
        isActive: false,
        parentIds: ["A1"],
        row: 1,
        column: 0,
      },
    ],
    [
      "B2",
      {
        id: "B2",
        activationCost: 99,
        isActive: false,
        parentIds: ["B1"],
        row: 1,
        column: 1,
      },
    ],
    [
      "C2",
      {
        id: "C2",
        activationCost: 99,
        isActive: false,
        parentIds: ["B1"],
        row: 1,
        column: 2,
      },
    ],
    [
      "A3",
      {
        id: "A3",
        activationCost: 99,
        isActive: false,
        parentIds: ["A2"],
        row: 2,
        column: 0,
      },
    ],
    [
      "B3",
      {
        id: "B3",
        activationCost: 99,
        isActive: false,
        parentIds: ["B2"],
        row: 2,
        column: 1,
      },
    ],
    [
      "C3",
      {
        id: "C3",
        activationCost: 99,
        isActive: false,
        parentIds: ["C2"],
        row: 2,
        column: 2,
      },
    ],
    [
      "A4",
      {
        id: "A4",
        activationCost: 99,
        isActive: false,
        parentIds: ["A3"],
        row: 3,
        column: 0,
      },
    ],
    [
      "B4",
      {
        id: "B4",
        activationCost: 99,
        isActive: false,
        parentIds: ["B3"],
        row: 3,
        column: 1,
      },
    ],
    [
      "C4",
      {
        id: "C4",
        activationCost: 99,
        isActive: false,
        parentIds: ["C3"],
        row: 3,
        column: 2,
      },
    ],
    [
      "A5",
      {
        id: "A5",
        activationCost: 99,
        isActive: false,
        parentIds: ["A4", "B4", "C4"],
        row: 4,
        column: 0,
      },
    ],
    [
      "B5",
      {
        id: "B5",
        activationCost: 99,
        isActive: false,
        parentIds: ["A4", "B4", "C4"],
        row: 4,
        column: 1,
      },
    ],
    [
      "C5",
      {
        id: "C5",
        activationCost: 99,
        isActive: false,
        parentIds: ["A4", "B4", "C4"],
        row: 4,
        column: 2,
      },
    ],
    [
      "B6",
      {
        id: "B6",
        activationCost: 99,
        isActive: false,
        parentIds: ["B5"],
        row: 5,
        column: 1,
      },
    ],
  ]),
];
