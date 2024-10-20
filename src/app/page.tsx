import AttributeEditor from "@/components/AttributeEditor";
import { Player, PlayerAttribute } from "@/lib/player";
import { Star } from "lucide-react";

export default function Home() {
  const player: Player = {
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
        "Sprint speed": {
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
  };

  const getCategoryValue = (attributes: PlayerAttribute[]) =>
    attributes.reduce((acc, attr) => acc + attr.value, 0) / attributes.length;

  return (
    <>
      <h2 className="mt-16 text-center text-3xl font-bold uppercase">
        Player info
      </h2>
      <div className="mb-8 flex flex-col gap-4 p-4">
        <div className="rounded-lg bg-node-locked p-4">
          <div>Position: {player.position}</div>
          <div>Height: {player.height}</div>
          <div>Weight: {player.weight}</div>
          <div>AcceleRATE: {player.accelerationRate}</div>
          <div className="flex gap-2">
            <span>Weak foot:</span>
            <div className="flex">
              {Array.from({ length: player.skillMoves }, () => (
                <Star size={24} fill="yellow" strokeWidth={0} />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <span>Skill moves:</span>
            <div className="flex">
              {Array.from({ length: player.skillMoves }, () => (
                <Star size={24} fill="yellow" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg bg-node-locked p-4">
          {Object.entries(player.attributes).map(([categoryName, category]) => {
            const categoryValue = getCategoryValue(Object.values(category));
            return (
              <div key={categoryName}>
                <div className="mb-1 flex justify-between">
                  <span>{categoryName}</span>
                  <span>{categoryValue}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-node-locked">
                  <div
                    className="h-2.5 rounded-full bg-highlight-dark"
                    style={{
                      width: `${(categoryValue / 99) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AttributeEditor />
    </>
  );
}
