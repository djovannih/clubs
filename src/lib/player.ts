type PlayerAttributes = {
  pace: {
    acceleration: {
      value: number;
      maxValue: 99;
    };
    speed: {
      value: number;
      maxValue: 99;
    };
  };
};

type Attribute = {
  name: string;
  value: number;
  maxValue: number;
};

type Role =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "ST";

type AccelerationRate =
  | "Explosive"
  | "Mostly Explosive"
  | "Controlled Explosive"
  | "Controlled"
  | "Controlled Lengthy"
  | "Mostly Lengthy"
  | "Lengthy";

export type Player = {
  role: Role;
  height: number;
  weight: number;
  accelerationRate: AccelerationRate;
  attributes: PlayerAttributes;
};
