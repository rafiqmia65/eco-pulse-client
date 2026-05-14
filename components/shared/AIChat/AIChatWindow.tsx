"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, Loader2, Sparkles, History, X, PlusCircle } from "lucide-react";
import { useAppStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { MessageRole } from "@/types/ai.types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function AIChatWindow({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isChatLoading,
    isMessagesLoading,
    conversations,
    activeConversationId,
    sendMessage,
    fetchConversations,
    fetchMessages,
    setActiveConversation,
  } = useAppStore();

  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isChatLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading) return;

    const msg = input;
    setInput("");
    await sendMessage(msg);
  };

  const handleConversationSelect = (id: string) => {
    fetchMessages(id);
    setShowHistory(false);
  };

  const startNewChat = () => {
    setActiveConversation(null);
    setShowHistory(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-2xl w-[min(95vw,350px)] sm:w-100 h-auto max-h-[calc(100vh-5rem)] sm:h-125 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Eco Assistant</h3>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                AI Powered
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowHistory(!showHistory)}
            title="History"
          >
            <History size={18} className={showHistory ? "text-primary" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 text-primary hover:bg-primary/10"
            onClick={startNewChat}
          >
            <PlusCircle size={16} />
            <span className="text-xs font-semibold">New Chat</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
            title="Close"
          >
            <X size={18} />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* History Overlay */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-10 bg-card border-l border-border flex flex-col"
            >
              <div className="p-3 border-b border-border font-medium text-sm flex justify-between items-center">
                Chat History
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                >
                  Back
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No previous chats
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationSelect(conv.id)}
                      className={`w-full text-left p-3 rounded-xl transition text-sm hover:bg-muted ${
                        activeConversationId === conv.id
                          ? "bg-primary/5 border border-primary/20"
                          : ""
                      }`}
                    >
                      <div className="font-medium truncate">
                        {conv.messages?.[0]?.content || "Empty Conversation"}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {format(new Date(conv.updatedAt), "MMM d, h:mm a")}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message List */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 && !isMessagesLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="p-4 bg-primary/5 rounded-full">
                <Sparkles size={32} className="text-primary/40" />
              </div>
              <div>
                <h4 className="font-medium text-sm">How can I help?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Ask me about eco-friendly solutions, sustainability tips, or
                  how to improve your ideas.
                </p>
              </div>
            </div>
          )}

          {isMessagesLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin text-primary" size={24} />
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === MessageRole.USER ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === MessageRole.USER
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted text-foreground rounded-tl-none border border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === MessageRole.USER ? (
                      <span className="text-[10px] opacity-70">You</span>
                    ) : (
                      <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                        <Bot size={10} /> EcoBot
                      </span>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))
          )}

          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-2xl rounded-tl-none border border-border px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-border bg-muted/30"
        >
          <div className="flex gap-2 bg-background border border-border rounded-xl p-1 focus-within:ring-2 ring-primary/20 transition">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
              disabled={isChatLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isChatLoading}
              className="h-9 w-9 rounded-lg"
            >
              {isChatLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
