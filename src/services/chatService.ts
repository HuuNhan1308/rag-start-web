import apiClient from '../api/axios';
import type { ChatRequest, ChatResponse } from '../types/chat';

export const sendQuestion = async (question: ChatRequest): Promise<ChatResponse> => {
  try {
    const response = await apiClient.post<ChatResponse>('/chat', question);
    
    return response.data;
  } catch (error) {
    console.error('Error sending question:', error);
    throw error;
  }
};
