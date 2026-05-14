import { StateCreator } from "zustand";
import { AppState } from "../index";
import {
  IAIAnalysisReport,
  IAIConversation,
  IAIMessage,
  IAIRecommendation,
  MessageRole,
} from "@/types/ai.types";
import {
  getAIRecommendationsAction,
  analyzeIdeaAction,
  getAIConversationsAction,
  getAIConversationMessagesAction,
} from "@/services/ai/ai.services";
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
    const { activeConversationId, messages } = get();
    set({ isChatLoading: true }, false, "ai/sendMessageStart");

    const tempUserId = Date.now().toString();
    const tempAssistantId = (Date.now() + 1).toString();

    // Optimistic UI update: add user message and an empty assistant message
    const userMessage: IAIMessage = {
      id: tempUserId,
      conversationId: activeConversationId || "temp",
      role: MessageRole.USER,
      content: message,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage: IAIMessage = {
      id: tempAssistantId,
      conversationId: activeConversationId || "temp",
      role: MessageRole.ASSISTANT,
      content: "",
      createdAt: new Date().toISOString(),
    };

    set({ messages: [...messages, userMessage, assistantMessage] }, false, "ai/optimisticMessages");

    try {
      const response = await fetch(`/api/chat-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversationId: activeConversationId || undefined }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to connect to AI stream";
        try {
          const errData = await response.json();
          if (errData.message) errorMsg = errData.message;
        } catch {}
        throw new Error(errorMsg);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("Stream reader not available");

      set({ isChatLoading: false }, false, "ai/streamStarted"); // Hide typing indicator once connected

      let done = false;
      let buffer = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          
          let newlineIndex;
          while ((newlineIndex = buffer.indexOf("\n\n")) >= 0) {
            const chunk = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 2);
            
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const jsonStr = line.replace("data: ", "").trim();
                  if (jsonStr) {
                    const data = JSON.parse(jsonStr);
                    if (data.chunk) {
                      // Append chunk to the assistant message
                      const currentMessages = get().messages;
                      const updatedMessages = currentMessages.map(msg => 
                        msg.id === tempAssistantId 
                          ? { ...msg, content: msg.content + data.chunk } 
                          : msg
                      );
                      set({ messages: updatedMessages }, false, "ai/streamChunk");
                    }
                    if (data.done) {
                      done = true;
                    }
                    if (data.error) {
                      throw new Error(data.error);
                    }
                  }
                } catch (e) {
                  console.error("Error parsing stream chunk:", e);
                }
              }
            }
          }
        }
      }

      // Stream complete! Now fetch the latest conversations and messages to get the real DB IDs.
      await get().fetchConversations();
      
      const latestConvs = get().conversations;
      let currentConvId = activeConversationId;

      // If it was a new chat, the backend created a new conversation.
      if (!activeConversationId && latestConvs.length > 0) {
        currentConvId = latestConvs[0].id;
        set({ activeConversationId: currentConvId }, false, "ai/setNewConversationId");
      }

      if (currentConvId) {
        await get().fetchMessages(currentConvId);
      }
      
    } catch (error) {
      console.error("Chat Stream Error:", error);
      
      // Revert optimistic messages on error
      const currentMessages = get().messages;
      set({ 
        messages: currentMessages.filter(msg => msg.id !== tempAssistantId && msg.id !== tempUserId),
        isChatLoading: false 
      }, false, "ai/sendMessageError");
      
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      handleAIError({ success: false, message: errorMessage });
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
