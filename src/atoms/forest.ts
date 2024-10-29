import { defendingTrees } from "@/forests/defending";
import { dribblingTrees } from "@/forests/dribbling";
import { goalkeepingTrees } from "@/forests/goalkeeping";
import { passingTrees } from "@/forests/passing";
import { physicalityTrees } from "@/forests/physicality";
import type { Graph, GraphNode } from "@/lib/graph";
import { getCheapestBranch } from "@/lib/graph";
import { type MainAttributeName } from "@/lib/player";
import { atom, type PrimitiveAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { paceTrees } from "../forests/pace";
import { shootingTrees } from "../forests/shooting";
import { jsonStorageOptions } from "./utils";

const toAtom = (forest: Graph[]) =>
  atom(
    forest.map((tree) =>
      atom(new Map(tree.entries().map(([key, value]) => [key, atom(value)]))),
    ),
  );
export const forestsAtom = atomWithStorage(
  "forests",
  new Map([
    ["pace" as MainAttributeName, toAtom(paceTrees)],
    ["shooting" as MainAttributeName, toAtom(shootingTrees)],
    ["passing" as MainAttributeName, toAtom(passingTrees)],
    ["dribbling" as MainAttributeName, toAtom(dribblingTrees)],
    ["defending" as MainAttributeName, toAtom(defendingTrees)],
    ["physicality" as MainAttributeName, toAtom(physicalityTrees)],
    ["goalkeeping" as MainAttributeName, toAtom(goalkeepingTrees)],
  ]),
  createJSONStorage(() => localStorage, jsonStorageOptions),
  // { getOnInit: true },
);

export const toggleNodeAtom = atom(
  null,
  (get, set, nodeAtom: PrimitiveAtom<GraphNode>) => {
    const node = get(nodeAtom);
    set(nodeAtom, { ...node, isActive: !node.isActive });
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
      getNodeCosts(get(trees)),
    ]),
  );
});
