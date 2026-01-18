import type { ApiResponse } from "./response";

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse extends ApiResponse<string> {
}
