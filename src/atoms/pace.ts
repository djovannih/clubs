import { playerAtom } from "@/atoms/player";
import {
  createTree,
  type Graph,
  type GraphNode,
  toggleNode,
} from "@/lib/graph";
import { updatePlayer } from "@/lib/player";
import { atom } from "jotai";

const treeAtoms = [
  atom<Graph>(
    createTree([
      {
        activationCost: 2,
        parentIds: [],
        row: 0,
        column: 0,
        actions: [{ attribute: "acceleration", value: 2 }],
      },
      {
        activationCost: 2,
        parentIds: [],
        row: 0,
        column: 2,
        actions: [{ attribute: "sprintSpeed", value: 2 }],
      },
      {
        activationCost: 2,
        parentIds: ["A1", "C1"],
        row: 1,
        column: 0,
        actions: [{ attribute: "acceleration", value: 2 }],
      },
      {
        activationCost: 3,
        parentIds: ["A1", "C1"],
        row: 1,
        column: 1,
        actions: [
          { attribute: "acceleration", value: 1 },
          { attribute: "sprintSpeed", value: 1 },
        ],
      },
      {
        activationCost: 2,
        parentIds: ["A1", "C1"],
        row: 1,
        column: 2,
        actions: [{ attribute: "sprintSpeed", value: 2 }],
      },
      {
        activationCost: 3,
        parentIds: ["A2"],
        row: 2,
        column: 0,
        actions: [{ attribute: "acceleration", value: 2 }],
      },
      {
        activationCost: 3,
        parentIds: ["C2"],
        row: 2,
        column: 2,
        actions: [{ attribute: "sprintSpeed", value: 2 }],
      },
      {
        activationCost: 3,
        parentIds: ["A3", "C3"],
        row: 3,
        column: 0,
        actions: [{ attribute: "acceleration", value: 2 }],
      },
      {
        activationCost: 4,
        parentIds: ["A3", "C3"],
        row: 3,
        column: 1,
        actions: [
          { attribute: "acceleration", value: 1 },
          { attribute: "sprintSpeed", value: 1 },
        ],
      },
      {
        activationCost: 3,
        parentIds: ["A3", "C3"],
        row: 3,
        column: 2,
        actions: [{ attribute: "sprintSpeed", value: 2 }],
      },
      {
        activationCost: 4,
        parentIds: ["A4"],
        row: 4,
        column: 0,
        actions: [{ attribute: "acceleration", value: 3 }],
      },
      {
        activationCost: 5,
        parentIds: ["B4"],
        row: 4,
        column: 1,
        actions: [
          { attribute: "acceleration", value: 2 },
          { attribute: "sprintSpeed", value: 2 },
        ],
      },
      {
        activationCost: 4,
        parentIds: ["C4"],
        row: 4,
        column: 2,
        actions: [{ attribute: "sprintSpeed", value: 2 }],
      },
    ]),
  ),
];

export const paceForestAtom = treeAtoms.map((treeAtom) =>
  atom(
    (get) => get(treeAtom),
    (get, set, node: GraphNode) => {
      const tree = get(treeAtom);
      const { updatedTree, toggledNodes } = toggleNode(tree, node);
      set(treeAtom, updatedTree);
      set(
        playerAtom,
        updatePlayer(
          get(playerAtom),
          toggledNodes,
          node.isActive ? "DEC" : "INC",
        ),
      );
    },
  ),
);
