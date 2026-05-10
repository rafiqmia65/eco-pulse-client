import { StateCreator } from "zustand";
import { AppState } from "../index";
import {
  IAIAnalysisReport,
  IAIConversation,
  IAIMessage,
  IAIRecommendation,
  IAIGeneratedContent,
} from "@/types/ai.types";
import {
  getAIRecommendationsAction,
  sendAIChatMessageAction,
  analyzeIdeaAction,
  getAIConversationsAction,
  getAIConversationMessagesAction,
} from "@/services/ai/ai.actions";
import { toast } from "sonner";
import { handleAIError } from "@/lib/ai-utils";

export interface AISlice {
  // Chat State
  conversations: IAIConversation[];
  activeConversationId: string | null;
  messages: IAIMessage[];
  isChatLoading: boolean;
  isMessagesLoading: boolean;

  // Recommendations State
  recommendations: IAIRecommendation[];
  isRecommendationsLoading: boolean;

  // Analysis State
  analysisReport: IAIAnalysisReport | null;
  isAnalysisLoading: boolean;

  // Actions
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  fetchRecommendations: () => Promise<void>;
  analyzeIdea: (ideaId: string) => Promise<void>;
  setActiveConversation: (id: string | null) => void;
  clearAnalysis: () => void;
}

export const createAISlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  AISlice
> = (set, get) => ({
  // Initial State
  conversations: [],
  activeConversationId: null,
  messages: [],
  isChatLoading: false,
  isMessagesLoading: false,
  recommendations: [],
  isRecommendationsLoading: false,
  analysisReport: null,
  isAnalysisLoading: false,

  // Actions
  fetchConversations: async () => {
    const res = await getAIConversationsAction();
    if (res.success && res.data) {
      set({ conversations: res.data }, false, "ai/fetchConversations");
    }
  },

  fetchMessages: async (conversationId: string) => {
    set(
      { isMessagesLoading: true, activeConversationId: conversationId },
      false,
      "ai/fetchMessagesStart",
    );
    const res = await getAIConversationMessagesAction(conversationId);
    if (res.success && res.data) {
      set(
        { messages: res.data, isMessagesLoading: false },
        false,
        "ai/fetchMessagesSuccess",
      );
    } else {
      set({ isMessagesLoading: false }, false, "ai/fetchMessagesError");
    }
  },

  sendMessage: async (message: string) => {
    const { activeConversationId } = get();
    set({ isChatLoading: true }, false, "ai/sendMessageStart");

    // Optimistic UI update could be added here

    const res = await sendAIChatMessageAction(
      message,
      activeConversationId || undefined,
    );

    if (res.success && res.data) {
      // If it was a new conversation, update the ID
      if (!activeConversationId) {
        set(
          { activeConversationId: res.data.conversationId },
          false,
          "ai/setNewConversationId",
        );
        await get().fetchConversations();
      }

      // Refresh messages
      await get().fetchMessages(res.data.conversationId);
      set({ isChatLoading: false }, false, "ai/sendMessageSuccess");
    } else {
      handleAIError(res);
      set({ isChatLoading: false }, false, "ai/sendMessageError");
    }
  },

  fetchRecommendations: async () => {
    set(
      { isRecommendationsLoading: true },
      false,
      "ai/fetchRecommendationsStart",
    );
    const res = await getAIRecommendationsAction();
    if (res.success && res.data) {
      set(
        { recommendations: res.data, isRecommendationsLoading: false },
        false,
        "ai/fetchRecommendationsSuccess",
      );
    } else {
      set(
        { isRecommendationsLoading: false },
        false,
        "ai/fetchRecommendationsError",
      );
    }
  },

  analyzeIdea: async (ideaId: string) => {
    set(
      { isAnalysisLoading: true, analysisReport: null },
      false,
      "ai/analyzeIdeaStart",
    );
    const res = await analyzeIdeaAction(ideaId);
    if (res.success && res.data) {
      set(
        { analysisReport: res.data, isAnalysisLoading: false },
        false,
        "ai/analyzeIdeaSuccess",
      );
    } else {
      handleAIError(res);
      set({ isAnalysisLoading: false }, false, "ai/analyzeIdeaError");
    }
  },

  setActiveConversation: (id) =>
    set(
      { activeConversationId: id, messages: id ? get().messages : [] },
      false,
      "ai/setActiveConversation",
    ),

  clearAnalysis: () => set({ analysisReport: null }, false, "ai/clearAnalysis"),
});
