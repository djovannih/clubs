import clsx from "clsx";

interface HorizontalLineProps {
  topRow: AttributeNode[];
  bottomRow: AttributeNode[];
}

export default function HorizontalLine({
  topRow,
  bottomRow,
}: HorizontalLineProps) {
  const drawFirstSegment = bottomRow
    .filter(({ column }) => column > 0)
    .some(({ parentsIds }) => parentsIds.some((id) => id.charAt(0) === "A"));

  const firstSegmentSelected =
    (topRow.at(0)?.selected &&
      bottomRow.some((node) => node.column > 0 && node.selected)) ||
    (topRow.some((node) => node.column > 0 && node.selected) &&
      bottomRow.at(0)?.selected);

  const drawSecondSegment = bottomRow
    .at(2)
    ?.parentsIds.some((id) => id.charAt(0) !== "C");

  const secondSegmentSelected =
    (topRow.find(({ column }) => column === 2)?.selected &&
      bottomRow.some((node) => node.column < 2 && node.selected)) ||
    (topRow.some((node) => node.column < 2 && node.selected) &&
      bottomRow.find(({ column }) => column === 2)?.selected);

  return (
    <div className="grid grid-cols-2 mx-3">
      {drawFirstSegment && (
        <div
          className={clsx(
            "h-2 col-start-1",
            firstSegmentSelected ? "bg-green-600 z-20" : "bg-gray-500",
            firstSegmentSelected &&
              !secondSegmentSelected &&
              "w-[calc(100%+0.25rem)]"
          )}
        ></div>
      )}
      {drawSecondSegment && (
        <div
          className={clsx(
            "h-2 col-start-2",
            secondSegmentSelected ? "bg-green-600 z-20" : "bg-gray-500",
            !firstSegmentSelected &&
              secondSegmentSelected &&
              "w-[calc(100%+0.25rem)] -ml-[0.25rem]"
          )}
        ></div>
      )}
    </div>
  );
}
