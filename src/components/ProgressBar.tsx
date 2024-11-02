interface ProgressBarProps {
  value: number;
  maxValue: number;
  label: string;
}

export default function ProgressBar({
  value,
  maxValue,
  label,
}: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-900">
        <div
          className="h-2.5 rounded-full bg-sky-700"
          style={{
            width: `${(value / maxValue) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
