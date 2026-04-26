import { TabItem } from "./types";

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap
      ${
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {tab.label}

      {typeof tab.badge === "number" && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">
          {tab.badge}
        </span>
      )}
    </button>
  );
}
