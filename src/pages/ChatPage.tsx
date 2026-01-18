import { useState, useEffect, useRef, type FormEvent } from 'react';
import type { ChatRequest, Message } from '../types/chat';
import { sendQuestion } from '../services/chatService';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      return;
    }

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmedInput,
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setError(null);
    setIsLoading(true);

    try {
      // Send question to backend
      const chatRequest: ChatRequest = { message: trimmedInput };
      const response = await sendQuestion(chatRequest);
      const answer = response.data || 'No response from server';

      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: answer,
        role: 'assistant',
        timestamp: new Date(),
      };

      // Add assistant response to chat
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-page">
      {/* Main Chat Area */}
      <main className="chat-container">
        <div className="messages-list">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>Welcome to AI Chat Assistant</h2>
              <p>Ask me anything and I'll help you find answers!</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-bubble">
                <p className="message-content">{message.content}</p>
                <span className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant-message">
              <div className="message-bubble loading-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="loading-text">AI is typing...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer Input Area */}
      <footer className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="question-input"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!inputValue.trim() || isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatPage;
