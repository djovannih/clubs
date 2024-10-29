import { defendingTrees } from "@/forests/defending";
import { dribblingTrees } from "@/forests/dribbling";
import { goalkeepingTrees } from "@/forests/goalkeeping";
import { paceTrees } from "@/forests/pace";
import { passingTrees } from "@/forests/passing";
import { physicalityTrees } from "@/forests/physicality";
import { shootingTrees } from "@/forests/shooting";
import { type Graph } from "@/lib/graph";
import {
  getAccelerationRate,
  type AttributeName,
  type MainAttributeName,
  type Position,
} from "@/lib/player";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { atomWithToggle, jsonStorageOptions } from "@/atoms/utils";

export const playerAtom = atomWithStorage(
  "player",
  {
    level: atom(100),
    availableSkillPoints: atom(160),
    position: atom<Position>("ST"),
    height: atom(160),
    weight: atom(45),
    weakFoot: atom(2),
    skillMoves: atom(3),
    attributes: new Map([
      ["acceleration" as AttributeName, { value: atom(81), maxValue: 99 }],
      ["sprintSpeed" as AttributeName, { value: atom(77), maxValue: 99 }],
      ["positioning" as AttributeName, { value: atom(85), maxValue: 99 }],
      ["finishing" as AttributeName, { value: atom(82), maxValue: 99 }],
      ["shotPower" as AttributeName, { value: atom(77), maxValue: 99 }],
      ["longShots" as AttributeName, { value: atom(78), maxValue: 99 }],
      ["volleys" as AttributeName, { value: atom(79), maxValue: 99 }],
      ["penalties" as AttributeName, { value: atom(83), maxValue: 99 }],
      ["vision" as AttributeName, { value: atom(73), maxValue: 99 }],
      ["crossing" as AttributeName, { value: atom(71), maxValue: 99 }],
      ["freeKickAccuracy" as AttributeName, { value: atom(78), maxValue: 99 }],
      ["shortPassing" as AttributeName, { value: atom(80), maxValue: 99 }],
      ["longPassing" as AttributeName, { value: atom(64), maxValue: 99 }],
      ["curve" as AttributeName, { value: atom(78), maxValue: 99 }],
      ["ballControl" as AttributeName, { value: atom(80), maxValue: 99 }],
      ["dribbling" as AttributeName, { value: atom(81), maxValue: 99 }],
      ["agility" as AttributeName, { value: atom(78), maxValue: 99 }],
      ["reactions" as AttributeName, { value: atom(85), maxValue: 99 }],
      ["balance" as AttributeName, { value: atom(80), maxValue: 99 }],
      ["composure" as AttributeName, { value: atom(88), maxValue: 99 }],
      ["interceptions" as AttributeName, { value: atom(60), maxValue: 99 }],
      ["defAwareness" as AttributeName, { value: atom(50), maxValue: 99 }],
      ["headingAccuracy" as AttributeName, { value: atom(72), maxValue: 99 }],
      ["slidingTackle" as AttributeName, { value: atom(52), maxValue: 99 }],
      ["standingTackle" as AttributeName, { value: atom(59), maxValue: 99 }],
      ["aggression" as AttributeName, { value: atom(66), maxValue: 99 }],
      ["jumping" as AttributeName, { value: atom(70), maxValue: 99 }],
      ["stamina" as AttributeName, { value: atom(77), maxValue: 99 }],
      ["strength" as AttributeName, { value: atom(73), maxValue: 99 }],
      ["gkDiving" as AttributeName, { value: atom(10), maxValue: 99 }],
      ["gkHandling" as AttributeName, { value: atom(10), maxValue: 99 }],
      ["gkKicking" as AttributeName, { value: atom(10), maxValue: 99 }],
      ["gkPositioning" as AttributeName, { value: atom(10), maxValue: 99 }],
      ["gkReflexes" as AttributeName, { value: atom(10), maxValue: 99 }],
    ]),
    forests: atom(
      new Map([
        ["pace" as MainAttributeName, toAtom(paceTrees)],
        ["shooting" as MainAttributeName, toAtom(shootingTrees)],
        ["passing" as MainAttributeName, toAtom(passingTrees)],
        ["dribbling" as MainAttributeName, toAtom(dribblingTrees)],
        ["defending" as MainAttributeName, toAtom(defendingTrees)],
        ["physicality" as MainAttributeName, toAtom(physicalityTrees)],
        ["goalkeeping" as MainAttributeName, toAtom(goalkeepingTrees)],
      ]),
    ),
    accelerationRate: atom((get) => {
      const player = get(playerAtom);
      return getAccelerationRate(
        player.height,
        get(player.attributes.get("agility")!.value),
        get(player.attributes.get("strength")!.value),
        get(player.attributes.get("acceleration")!.value),
      );
    }),
  },
  createJSONStorage(() => localStorage, jsonStorageOptions),
  // { getOnInit: true },
);

function toAtom(forest: Graph[]) {
  return atom(
    forest.map((tree) =>
      atom(
        new Map(
          tree.entries().map(([key, value]) => [
            key,
            {
              ...value,
              isActive: atomWithToggle(value.isActive),
              actions: value.actions.map((action) =>
                atom(null, (get, set) => {
                  const player = get(playerAtom);
                  const attributeAtom = player.attributes.get(
                    action.attribute,
                  )!.value;
                  set(attributeAtom, get(attributeAtom) + 1);
                }),
              ),
            },
          ]),
        ),
      ),
    ),
  );
}
