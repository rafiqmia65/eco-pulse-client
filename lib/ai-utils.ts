import { ApiResponse } from "@/types/api.types";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
import React from "react";

type AIErrorResponse = {
  statusCode?: number;
  httpStatusCode?: number;
  message?: string;
};

/**
 * Handles AI-specific errors, particularly rate limits (429).
 * Displays a premium, user-friendly notification.
 */
export const handleAIError = (res: ApiResponse<unknown> | AIErrorResponse) => {
  const statusCode = res?.statusCode || res?.httpStatusCode;
  const message =
    res?.message || "An unexpected error occurred with our AI service.";

  // Detect technical error messages and replace them with user-friendly versions
  const isTechnicalLimitError =
    message.includes("GoogleGenerativeAI Error") ||
    message.includes("Quota exceeded") ||
    message.includes("429") ||
    message.toLowerCase().includes("too many requests");

  if (statusCode === 429 || isTechnicalLimitError) {
    const friendlyMessage =
      "Daily AI limit reached. Please try again tomorrow.";

    return toast.error("Daily Limit Reached", {
      description: friendlyMessage,
      duration: 5000,
      icon: React.createElement(ShieldAlert, {
        className: "text-primary h-5 w-5",
      }),
      className: "border-primary/20 bg-primary/5 text-primary rounded-2xl p-4",
    });
  }

  // Handle other errors
  return toast.error(message);
};
