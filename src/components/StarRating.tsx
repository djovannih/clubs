import { Star } from "lucide-react";

interface StarRatingProps {
  starsCount: number;
  maxStarsCount: number;
}
export default function StarRating({
  starsCount,
  maxStarsCount,
}: StarRatingProps) {
  return (
    <span className="flex">
      {Array.from({ length: maxStarsCount }, (_, i) => (
        <Star
          key={i}
          size={24}
          fill={i < starsCount ? "yellow" : "#0f172a"}
          strokeWidth={i < starsCount ? 0 : 1}
          stroke="#0f172a"
        />
      ))}
    </span>
  );
}
