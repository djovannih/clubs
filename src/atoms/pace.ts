import {
  type Graph,
  GraphNode,
  toggleNode,
  UpdatePlayerAction,
} from "@/lib/graph";
import { Player } from "@/lib/player";
import { atom } from "jotai";
import { playerAtom } from "./player";

const paceForest = [
  atom<Graph>(
    new Map([
      [
        "A1",
        {
          id: "A1",
          activationCost: 2,
          isActive: false,
          parentIds: [],
          row: 0,
          column: 0,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "C1",
        {
          id: "C1",
          activationCost: 2,
          isActive: false,
          parentIds: [],
          row: 0,
          column: 2,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "A2",
        {
          id: "A2",
          activationCost: 2,
          isActive: false,
          parentIds: ["A1", "C1"],
          row: 1,
          column: 0,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "B2",
        {
          id: "B2",
          activationCost: 3,
          isActive: false,
          parentIds: ["A1", "C1"],
          row: 1,
          column: 1,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    1 * (action === "INC" ? 1 : -1),
                },
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    1 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "C2",
        {
          id: "C2",
          activationCost: 2,
          isActive: false,
          parentIds: ["A1", "C1"],
          row: 1,
          column: 2,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "A3",
        {
          id: "A3",
          activationCost: 3,
          isActive: false,
          parentIds: ["A2"],
          row: 2,
          column: 0,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "C3",
        {
          id: "C3",
          activationCost: 3,
          isActive: false,
          parentIds: ["C2"],
          row: 2,
          column: 2,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "A4",
        {
          id: "A4",
          activationCost: 3,
          isActive: false,
          parentIds: ["A3", "C3"],
          row: 3,
          column: 0,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "B4",
        {
          id: "B4",
          activationCost: 4,
          isActive: false,
          parentIds: ["A3", "C3"],
          row: 3,
          column: 1,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    1 * (action === "INC" ? 1 : -1),
                },
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    1 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "C4",
        {
          id: "C4",
          activationCost: 3,
          isActive: false,
          parentIds: ["A3", "C3"],
          row: 3,
          column: 2,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "A5",
        {
          id: "A5",
          activationCost: 4,
          isActive: false,
          parentIds: ["A4"],
          row: 4,
          column: 0,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    3 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "B5",
        {
          id: "B5",
          activationCost: 5,
          isActive: false,
          parentIds: ["B4"],
          row: 4,
          column: 1,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                Acceleration: {
                  ...player.attributes.Pace.Acceleration,
                  value:
                    player.attributes.Pace.Acceleration.value +
                    2 * (action === "INC" ? 1 : -1),
                },
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
      [
        "C5",
        {
          id: "C5",
          activationCost: 4,
          isActive: false,
          parentIds: ["C4"],
          row: 4,
          column: 2,
          updatePlayer: (player: Player, action: UpdatePlayerAction) => ({
            ...player,
            attributes: {
              ...player.attributes,
              Pace: {
                ...player.attributes.Pace,
                "Sprint Speed": {
                  ...player.attributes.Pace["Sprint Speed"],
                  value:
                    player.attributes.Pace["Sprint Speed"].value +
                    2 * (action === "INC" ? 1 : -1),
                },
              },
            },
          }),
        },
      ],
    ]),
  ),
];

export const paceForestAtom = paceForest.map((treeAtom) =>
  atom(
    (get) => get(treeAtom),
    (get, set, nodeId: string) => {
      const tree = get(treeAtom);
      const node = tree.get(nodeId)!;
      set(treeAtom, toggleNode(tree, nodeId));
      set(
        playerAtom,
        node.updatePlayer(get(playerAtom), node.isActive ? "DEC" : "INC"),
      );
    },
  ),
);
