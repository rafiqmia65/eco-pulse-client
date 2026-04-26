import React from "react";

export type TabItem = {
  key: string;
  label: string;
  content: React.ReactNode;
  badge?: number;
};
