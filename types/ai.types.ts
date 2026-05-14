export interface IAIGeneratedContent {
  title: string;
  slug: string;
  problem: string;
  solution: string;
  description: string;
}

export interface IAIRecommendation {
  ideaId: string;
  title: string;
  reason: string;
}

export interface IAIChatResponse {
  conversationId: string;
  response: string;
}

export interface IAIAnalysisReport {
  impactScore: number;
  sentimentAnalysis: "Positive" | "Mixed" | "Negative";
  keyStrengths: string[];
  improvementSuggestions: string[];
  overallInsight: string;
}

export enum MessageRole {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
}

export interface IAIMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface IAIConversation {
  id: string;
  userId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  messages?: IAIMessage[];
}

export interface IAIPrediction {
  score: number;
  reasoning: string;
  marketPotential: "High" | "Medium" | "Low";
  sustainabilityImpact: "High" | "Medium" | "Low";
}
