/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { 
  IAIAnalysisReport, 
  IAIChatResponse, 
  IAIConversation, 
  IAIGeneratedContent, 
  IAIMessage, 
  IAIRecommendation 
} from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";

/**
 * Generate eco-idea content from a topic
 */
export async function generateAIContentAction(
  topic: string,
  categoryId?: string,
): Promise<ApiResponse<IAIGeneratedContent>> {
  try {
    const res = await httpClient.post<IAIGeneratedContent>(
      "/api/v1/ai/generate-content",
      { topic, categoryId },
    );
    return res;
  } catch (error: any) {
    return (
      error?.response?.data || {
        success: false,
        message: "Failed to generate AI content",
      }
    );
  }
}


/**
 * Get smart recommendations for user
 */
export async function getAIRecommendationsAction(): Promise<ApiResponse<IAIRecommendation[]>> {
  try {
    const res = await httpClient.get<IAIRecommendation[]>("/api/v1/ai/recommendations");
    return res;
  } catch (error: any) {
    return error?.response?.data || { success: false, message: "Failed to fetch recommendations" };
  }
}

/**
 * AI Chat Assistant
 */
export async function sendAIChatMessageAction(message: string, conversationId?: string): Promise<ApiResponse<IAIChatResponse>> {
  try {
    const res = await httpClient.post<IAIChatResponse>("/api/v1/ai/chat", { message, conversationId });
    return res;
  } catch (error: any) {
    return error?.response?.data || { success: false, message: "Failed to send message" };
  }
}

/**
 * Analyze idea performance
 */
export async function analyzeIdeaAction(ideaId: string): Promise<ApiResponse<IAIAnalysisReport>> {
  try {
    const res = await httpClient.get<IAIAnalysisReport>(`/api/v1/ai/analyze/${ideaId}`);
    return res;
  } catch (error: any) {
    return error?.response?.data || { success: false, message: "Failed to analyze idea" };
  }
}

/**
 * Fetch user's conversation history
 */
export async function getAIConversationsAction(): Promise<ApiResponse<IAIConversation[]>> {
  try {
    const res = await httpClient.get<IAIConversation[]>("/api/v1/ai/conversations");
    return res;
  } catch (error: any) {
    return error?.response?.data || { success: false, message: "Failed to fetch conversations" };
  }
}

/**
 * Fetch messages for a specific conversation
 */
export async function getAIConversationMessagesAction(conversationId: string): Promise<ApiResponse<IAIMessage[]>> {
  try {
    const res = await httpClient.get<IAIMessage[]>(`/api/v1/ai/conversations/${conversationId}`);
    return res;
  } catch (error: any) {
    return error?.response?.data || { success: false, message: "Failed to fetch messages" };
  }
}
