"use client";

import { useState } from "react";
import { TabItem } from "./types";
import TabButton from "./TabButton";
import TabContent from "./TabContent";

interface Props {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onTabChange,
}: Props) {
  const [internalActive, setInternalActive] = useState(
    defaultTab || tabs[0]?.key,
  );

  const active = controlledActive ?? internalActive;

  const handleTabChange = (key: string) => {
    if (onTabChange) {
      onTabChange(key);
    } else {
      setInternalActive(key);
    }
  };

  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div className="w-full">
      <div className="bg-background/80 backdrop-blur border-b">
        <div className="flex gap-6 text-sm font-medium px-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={active === tab.key}
              onClick={() => handleTabChange(tab.key)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <TabContent content={activeTab?.content} />
    </div>
  );
}
