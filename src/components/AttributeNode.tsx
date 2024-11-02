import { playerAtom, type TreeNode } from "@/atoms/player";
import Badge from "@/components/Badge";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

interface AttributeNodeProps {
  node: TreeNode;
}
export default function AttributeNode({ node }: AttributeNodeProps) {
  const t = useTranslations("Attributes");
  const [isActive, toggleIsActive] = useAtom(node.isActive);
  const activationCost = useAtomValue(node.actualActivationCost);
  const player = useAtomValue(playerAtom);
  const playerSkillPoints = useAtomValue(player.availableSkillPoints);

  return (
    <div
      className="items-between z-10 flex h-full flex-col"
      style={{ gridColumnStart: node.column + 1 }}
    >
      <button
        className={clsx(
          "relative rounded-lg p-4",
          isActive ? "bg-green-600" : "bg-slate-700",
        )}
        onClick={() => toggleIsActive()}
        disabled={activationCost > playerSkillPoints}
      >
        <ul className="flex min-h-[2lh] grow flex-col items-center justify-center rounded-sm text-sm">
          {[...node.modifiers.entries()].map(([attributeName, modifier]) => (
            <li
              key={attributeName}
              className="text-nowrap"
            >{`${t(`${attributeName}.short`)} +${modifier}`}</li>
          ))}
        </ul>
        <Badge active={isActive}>{node.baseActivationCost}</Badge>
      </button>
    </div>
  );
}
