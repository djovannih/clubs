import { forestsAtom, nodeCostsAtom, toggleNodeAtom } from "@/atoms/forest";
import { playerAtom } from "@/atoms/player";
import Badge from "@/components/Badge";
import type { MainAttributeName } from "@/lib/player";
import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

interface AttributeNodeProps {
  forestName: MainAttributeName;
  treeIndex: number;
  nodeId: string;
}
export default function AttributeNode({
  forestName,
  treeIndex,
  nodeId,
}: AttributeNodeProps) {
  const t = useTranslations("Attributes");
  const node = useAtomValue(forestsAtom)
    .get(forestName)!
    .at(treeIndex)!
    .get(nodeId)!;
  const branchCost = useAtomValue(nodeCostsAtom)
    .get(forestName)!
    .at(treeIndex)!
    .get(nodeId)!;
  const toggleNode = useSetAtom(toggleNodeAtom);
  const player = useAtomValue(playerAtom);

  return (
    <div
      className="items-between z-10 mx-4 flex h-full flex-col"
      style={{ gridColumnStart: node.column + 1 }}
    >
      <button
        className={clsx(
          "relative rounded-lg p-4",
          node.isActive ? "bg-primary-dark" : "bg-inactive-node",
        )}
        onClick={() => toggleNode(forestName, treeIndex, nodeId)}
        disabled={branchCost > player.availableSkillPoints}
      >
        <ul className="flex min-h-[2lh] grow flex-col items-center justify-center rounded-sm text-sm">
          {node.actions.map((action) => (
            <li
              key={action.attribute}
            >{`${t(`${action.attribute}.short`)} +${action.value}`}</li>
          ))}
        </ul>
        <Badge>{node.activationCost}</Badge>
      </button>
    </div>
  );
}
