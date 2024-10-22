import { playerAtom } from "@/atoms/player";
import {
  type Graph,
  GraphNode,
  toggleNode,
  type UpdatePlayerAction,
} from "@/lib/graph";
import type { Player, UpdateAttributeAction } from "@/lib/player";
import { atom } from "jotai";

const paceForest = [
  atom<Graph>(
    new Map<string, GraphNode>([
      [
        "A1",
        {
          id: "A1",
          activationCost: 2,
          isActive: false,
          parentIds: [],
          row: 0,
          column: 0,
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 1,
            },
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 1,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 1,
            },
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 1,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 3,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "acceleration",
              value: 2,
            },
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 2,
            },
          ],
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
          actions: [
            {
              category: "pace",
              attribute: "sprintSpeed",
              value: 2,
            },
          ],
        },
      ],
    ]),
  ),
];

const updatePlayer = (
  player: Player,
  action: UpdatePlayerAction,
  updateAttributeActions: UpdateAttributeAction[],
) => {
  const update = (updateAttributeAction: UpdateAttributeAction) => {
    const mainAttr = player.attributes.get(updateAttributeAction.category);
    const subAttr = mainAttr?.get(updateAttributeAction.attribute);

    const currentCategory = player.attributes.get(
      updateAttributeAction.category,
    );
    const currentAttribute = currentCategory?.get(
      updateAttributeAction.attribute,
    );

    if (!mainAttr || !subAttr || !currentCategory || !currentAttribute)
      return player;

    const updatedValue =
      action === "INC"
        ? updateAttributeAction.value
        : -updateAttributeAction.value;

    return {
      ...player,
      attributes: player.attributes.set(
        updateAttributeAction.category,
        currentCategory.set(updateAttributeAction.attribute, {
          ...currentAttribute,
          value: currentAttribute.value + updatedValue,
        }),
      ),
    };
  };

  return updateAttributeActions.reduce((_, action) => update(action), player);
};

export const paceForestAtom = paceForest.map((treeAtom) =>
  atom(
    (get) => get(treeAtom),
    (get, set, nodeId: string) => {
      const tree = get(treeAtom);
      const node = tree.get(nodeId)!;
      set(treeAtom, toggleNode(tree, nodeId));
      set(
        playerAtom,
        updatePlayer(
          get(playerAtom),
          node.isActive ? "DEC" : "INC",
          node.actions,
        ),
      );
    },
  ),
);
