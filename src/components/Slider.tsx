interface SliderProps {
  headline: string;
  value: number;
  minValue: number;
  maxValue: number;
  markedValues: number[];
  updateValue: (value: number) => void;
  suffix?: string;
}
export default function Slider({
  headline,
  value,
  minValue,
  maxValue,
  markedValues,
  updateValue,
  suffix = "",
}: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span>{headline}</span>
          <span>{`${value} ${suffix}`}</span>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={value}
            onChange={(e) => updateValue(parseInt(e.target.value))}
            className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
            style={{
              background: `linear-gradient(to right, #0369a1 0%, #0369a1 ${((value - minValue) / (maxValue - minValue)) * 100}%, #0f172a ${((value - minValue) / (maxValue - minValue)) * 100}%, #0f172a 100%)`,
            }}
          />
          <div className="relative flex h-6 w-full">
            {markedValues.map((value) => (
              <div
                key={value}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
                  right: `${((maxValue - value) / (maxValue - minValue)) * 100}%`,
                }}
              >
                <span className="h-2 w-2 rounded-full bg-sky-700"></span>
                <span className="text-xs text-slate-500">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
