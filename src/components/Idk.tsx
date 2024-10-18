import { activateNode, deactivateNode, Graph } from "@/lib/graph";
import { paceGraph, shootingGraph } from "@/lib/graphs";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import AttributeTree from "./AttributeTree";

interface IdkProps {}

export default function Idk({}: IdkProps) {
  const tabs = [
    "Pace",
    "Shooting",
    "Passing",
    "Dribbling",
    "Defending",
    "Physical",
  ];

  const [activeTab, setActiveTab] = useState<string>();
  const [paceTree, setPaceTree] = useState(paceGraph);
  const [shootingTree, setShootingTree] = useState(shootingGraph);

  const getActiveTree = () => {
    switch (activeTab) {
      case "Pace":
        const tree = paceTree;
        return (
          <AttributeTree
            tree={tree}
            toggleNode={toggleNode(tree, setPaceTree)}
          />
        );
      case "Shooting":
        return [shootingTree, setShootingTree];
      default:
        console.error(`Unexpected value: ${activeTab}`);
        return [undefined, undefined];
    }
  };

  const toggleNode =
    (tree: Graph, setTree: Dispatch<SetStateAction<Graph>>) =>
    (nodeId: string) => {
      const node = tree.get(nodeId);
      const updatedTree = !node
        ? tree
        : node.isActive
          ? deactivateNode(tree, nodeId)
          : activateNode(tree, nodeId);
      setTree(updatedTree);
    };

  const [activeTree, setActiveTree] = getActiveTree();

  return (
    <>
      <div className="my-8 grid grid-cols-3 justify-between bg-background">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "p-2",
              tab === activeTab ? "bg-highlight-dark" : "bg-node-locked",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTree ? (
        <AttributeTree
          tree={activeTree.at(0)}
          toggleNode={toggleNode(activeTree, se)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
