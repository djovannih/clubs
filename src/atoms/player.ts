import { Player, PlayerAttribute } from "@/lib/player";
import { atom } from "jotai";

export const playerAtom = atom<Player>({
  position: "CAM",
  height: 180,
  weight: 80,
  accelerationRate: "Controlled Explosive",
  weakFoot: 3,
  skillMoves: 4,
  attributes: {
    Pace: {
      Acceleration: {
        value: 70,
        maxValue: 99,
      },
      "Sprint Speed": {
        value: 70,
        maxValue: 99,
      },
    },
    Shooting: {
      Positioning: {
        value: 70,
        maxValue: 99,
      },
      Finishing: {
        value: 70,
        maxValue: 99,
      },
      "Shot Power": {
        value: 70,
        maxValue: 99,
      },
      "Long Shots": {
        value: 70,
        maxValue: 99,
      },
      Volleys: {
        value: 70,
        maxValue: 99,
      },
      Penalties: {
        value: 70,
        maxValue: 99,
      },
    },
    Passing: {
      Vision: {
        value: 70,
        maxValue: 99,
      },
      Crossing: {
        value: 70,
        maxValue: 99,
      },
      "Free Kick Accuracy": {
        value: 70,
        maxValue: 99,
      },
      "Short Passing": {
        value: 70,
        maxValue: 99,
      },
      "Long Passing": {
        value: 70,
        maxValue: 99,
      },
      Curve: {
        value: 70,
        maxValue: 99,
      },
    },
    Dribbling: {
      "Ball Control": {
        value: 70,
        maxValue: 99,
      },
      Dribbling: {
        value: 70,
        maxValue: 99,
      },
      Agility: {
        value: 70,
        maxValue: 99,
      },
      Reactions: {
        value: 70,
        maxValue: 99,
      },
      Balance: {
        value: 70,
        maxValue: 99,
      },
      Composure: {
        value: 70,
        maxValue: 99,
      },
    },
    Defending: {
      Interceptions: {
        value: 70,
        maxValue: 99,
      },
      "Def awareness": {
        value: 70,
        maxValue: 99,
      },
      "Heading accuracy": {
        value: 70,
        maxValue: 99,
      },
      "Sliding Tackle": {
        value: 70,
        maxValue: 99,
      },
      "Standing Tackle": {
        value: 70,
        maxValue: 99,
      },
    },
    Physicality: {
      Aggression: {
        value: 70,
        maxValue: 99,
      },
      Jumping: {
        value: 70,
        maxValue: 99,
      },
      Stamina: {
        value: 70,
        maxValue: 99,
      },
      Strength: {
        value: 70,
        maxValue: 99,
      },
    },
  },
});

const getCategoryValue = (attributes: PlayerAttribute[]) =>
  Math.round(
    attributes.reduce((acc, attr) => acc + attr.value, 0) / attributes.length,
  );

export const playerAttributesValues = atom(
  (get) =>
    new Map(
      Object.entries(get(playerAtom).attributes).map(
        ([categoryName, category]) => [
          categoryName,
          getCategoryValue(Object.values(category)),
        ],
      ),
    ),
);
