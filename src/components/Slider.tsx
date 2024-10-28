interface SliderProps {
  headline: string;
  value: number;
  minValue: number;
  maxValue: number;
  markedValues: number[];
  updateValue: (value: number) => void;
}
export default function Slider({
  headline,
  value,
  minValue,
  maxValue,
  markedValues,
  updateValue,
}: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span>{headline}</span>
          <span>{value}</span>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={value}
            onChange={(e) => updateValue(parseInt(e.target.value))}
            className="bg-slate-200 h-2.5 w-full cursor-pointer appearance-none rounded-lg"
            style={{
              background: `linear-gradient(to right, #0369a1 0%, #0369a1 ${((value - minValue) / (maxValue - minValue)) * 100}%, #020617 ${((value - minValue) / (maxValue - minValue)) * 100}%, #020617 100%)`,
            }}
          />
          <div className="relative flex h-6 w-full">
            {markedValues.map((val) => (
              <div
                key={val}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${((val - minValue) / (maxValue - minValue)) * 100}%`,
                  right: `${((maxValue - val) / (maxValue - minValue)) * 100}%`,
                }}
              >
                <span className="bg-sky-700 h-2 w-2 rounded-full"></span>
                <span className="text-slate-500 text-xs">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
