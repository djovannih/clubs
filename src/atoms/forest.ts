import type { Graph } from "@/lib/graph";
import { getCheapestBranch, toggleNode } from "@/lib/graph";
import { updatePlayer, type MainAttributeName } from "@/lib/player";
import { atom } from "jotai";
import { paceTrees } from "../forests/pace";
import { shootingTrees } from "../forests/shooting";
import { playerAtom } from "./player";
import { passingTrees } from "@/forests/passing";
import { dribblingTrees } from "@/forests/dribbling";
import { defendingTrees } from "@/forests/defending";
import { physicalityTrees } from "@/forests/physicality";
import { goalkeepingTrees } from "@/forests/goalkeeping";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { jsonStorageOptions } from "./utils";

export const forestsAtom = atomWithStorage(
  "forests",
  new Map<MainAttributeName, Graph[]>([
    ["pace", paceTrees],
    ["shooting", shootingTrees],
    ["passing", passingTrees],
    ["dribbling", dribblingTrees],
    ["defending", defendingTrees],
    ["physicality", physicalityTrees],
    ["goalkeeping", goalkeepingTrees],
  ]),
  createJSONStorage(() => localStorage, jsonStorageOptions),
  { getOnInit: true },
);

export const toggleNodeAtom = atom(
  null,
  (
    get,
    set,
    forestName: MainAttributeName,
    treeIndex: number,
    nodeId: string,
  ) => {
    const forests = get(forestsAtom);
    const forest = forests.get(forestName)!;
    const tree = forest.at(treeIndex)!;
    const node = tree.get(nodeId)!;
    const { updatedTree, toggledNodes } = toggleNode(tree, node);
    const updatedForest = [
      ...forest.slice(0, treeIndex),
      updatedTree,
      ...forest.slice(treeIndex + 1),
    ];
    set(forestsAtom, new Map(forests.set(forestName, updatedForest)));
    set(
      playerAtom,
      updatePlayer(
        get(playerAtom),
        toggledNodes,
        node.isActive ? "DEC" : "INC",
      ),
    );
  },
);

const getNodeCosts = (trees: Graph[]) =>
  trees.map((tree) => {
    return new Map(
      Array.from(tree.values()).map((node) => [
        node.id,
        getCheapestBranch(node, tree).reduce(
          (cost, n) => cost + n.activationCost,
          0,
        ),
      ]),
    );
  });
export const nodeCostsAtom = atom((get) => {
  return new Map(
    Array.from(get(forestsAtom).entries()).map(([forestName, trees]) => [
      forestName,
      getNodeCosts(trees),
    ]),
  );
});
