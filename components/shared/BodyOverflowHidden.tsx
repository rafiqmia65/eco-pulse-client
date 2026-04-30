"use client";

import { useEffect } from "react";

export default function BodyOverflowHidden() {
  useEffect(() => {
    // Prevent body from scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore overflow on unmount
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = "";
    };
  }, []);

  return null;
}
