"use client";

import { useState } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AIChatWindow from "./AIChatWindow";

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="mb-4 max-w-[95vw]"
            >
              <AIChatWindow onClose={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 bg-primary border-primary text-primary-foreground"
          >
            <div className="relative">
              <MessageSquare size={24} />
              <Sparkles
                size={12}
                className="absolute -top-1 -right-1 text-yellow-400 animate-pulse"
              />
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
}
