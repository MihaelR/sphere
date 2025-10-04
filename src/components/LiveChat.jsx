import React, { useState, useEffect, useRef } from "react";

// Mock chat data
const initialMessages = [
  {
    id: 1,
    user: "0xA1...B2",
    message: "Just bought spot #12! 🚀",
    timestamp: new Date(Date.now() - 60000),
    type: "message",
    avatar: "🌙",
  },
  {
    id: 2,
    user: "0xC3...D4",
    message: "Nice! I'm eyeing spot #7",
    timestamp: new Date(Date.now() - 45000),
    type: "message",
    avatar: "⭐",
  },
  {
    id: 3,
    user: "MOONR_Bot",
    message: "Welcome to MOONR chat! 🌕",
    timestamp: new Date(Date.now() - 30000),
    type: "system",
    avatar: "🤖",
  },
];

const randomMessages = [
  "Looking to trade some spots!",
  "This sphere is incredible 😍",
  "Anyone know the floor price?",
  "GM frens! ☀️",
  "Just joined the community!",
  "Love the art on spot #33",
  "When moon? 🌙",
  "Great project team! 👏",
  "Buying the dip 📉➡️📈",
  "Diamond hands! 💎🙌",
];

const randomUsers = [
  { name: "0xE5...F6", avatar: "🔥" },
  { name: "0xG7...H8", avatar: "💎" },
  { name: "0xI9...J0", avatar: "🚀" },
  { name: "0xK1...L2", avatar: "⚡" },
  { name: "0xM3...N4", avatar: "🎯" },
];

export default function LiveChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(23);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate random messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser =
        randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomMsg =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];

      const newMsg = {
        id: Date.now(),
        user: randomUser.name,
        message: randomMsg,
        timestamp: new Date(),
        type: "message",
        avatar: randomUser.avatar,
      };

      setMessages((prev) => [...prev.slice(-19), newMsg]); // Keep last 20 messages
      setOnlineUsers((prev) =>
        Math.max(15, prev + Math.floor(Math.random() * 3) - 1)
      );
    }, 8000 + Math.random() * 7000); // Random interval 8-15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      user: "You",
      message: newMessage.trim(),
      timestamp: new Date(),
      type: "user",
      avatar: "🫵",
    };

    setMessages((prev) => [...prev.slice(-19), userMessage]);
    setNewMessage("");
    inputRef.current?.focus();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageStyle = (type, user) => {
    if (type === "system") {
      return "bg-blue-500/20 border-blue-500/30 text-blue-200";
    }
    if (type === "user" || user === "You") {
      return "bg-yellow-500/20 border-yellow-500/30 text-yellow-100 ml-4";
    }
    return "bg-base-200/80 border-base-content/20 text-base-content/90";
  };

  return (
    <div className="w-64 min-w-0 max-w-full rounded-xl shadow-lg overflow-hidden bg-base-200 bg-opacity-80 backdrop-blur-sm flex flex-col h-80">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-bold text-xs">Live Chat</span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            <span>{onlineUsers} online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-2 space-y-2 bg-base-100/50 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg p-2 border text-xs transition-all duration-200 ${getMessageStyle(
              msg.type,
              msg.user
            )}`}
          >
            <div className="flex items-start gap-1.5">
              <span className="text-sm flex-shrink-0">{msg.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-bold text-[10px] truncate">
                    {msg.user}
                  </span>
                  <span className="text-[9px] opacity-60">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div className="break-words leading-relaxed">{msg.message}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="bg-base-200/60 rounded-lg p-2 border border-base-content/10 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">💭</span>
              <div className="flex-1">
                <span className="text-base-content/60 text-[10px]">
                  Someone is typing
                </span>
                <div className="flex gap-1 mt-1">
                  <div className="w-1 h-1 bg-base-content/40 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-base-content/40 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-base-content/40 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-2 border-t border-base-content/20 bg-base-100/80 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-1">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-2 py-1 text-xs rounded border border-base-content/20 bg-base-200/80 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            💬
          </button>
        </form>
        <div className="text-[9px] text-base-content/60 mt-1 text-center">
          Press Enter to send
        </div>
      </div>
    </div>
  );
}
