"use client";

import { ReactNode } from "react";

interface TabContentProps {
  content?: ReactNode;
}

export default function TabContent({ content }: TabContentProps) {
  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {content}
    </div>
  );
}
