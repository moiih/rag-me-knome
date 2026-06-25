
import React, { useState, type SubmitEvent, type ChangeEvent } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatApiResponse {
  response: string;
}

function ChatBox(): React.JSX.Element {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (e: SubmitEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault(); // Works exactly the same way
  if (!input.trim()) return;

  const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }), 
      });

      if (!response.ok) throw new Error('Network error');

      const data: ChatApiResponse = await response.json();
      setMessages((prev) => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Failed to process message.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-5 max-w-[600px] font-sans px-4">
      {/* Scrollable Chat Window Container */}
      <div className="h-[50px] overflow-y-auto border border-gray-300 p-[10px] rounded-md flex flex-col gap-3 bg-gray-50">
        {messages.map((msg: Message, index: number) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={index} 
              className={`flex flex-col max-w-[80%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
            >
              {/* Sender Name Label */}
              <span className="text-xs text-gray-500 mb-1 px-1">
                {isUser ? 'You' : 'AI'}
              </span>
              
              {/* Message Bubble Graphics */}
              <div 
                className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  isUser 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        
        {/* Loading State Indicator */}
        {loading && (
          <div className="self-start text-xs text-gray-400 italic mt-1 animate-pulse">
            AI is formulating response...
          </div>
        )}
      </div>

      {/* Input Message Form Tray */}
      <form onSubmit={sendMessage} className="flex gap-2 mt-[10px]">
        <input 
          type="text" 
          value={input} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} 
          className="flex-grow p-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          placeholder="Ask a question..."
        />
        <button 
          type="submit" 
          disabled={loading} 
          className={`px-5 py-[10px] rounded-md text-sm font-medium text-white transition-colors ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
}



export default ChatBox;