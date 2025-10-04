import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/config";

export default function FirebaseChat({ isTabbed = false }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showNameChanger, setShowNameChanger] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // Debounce scroll updates
  const scrollTimeoutRef = useRef(null);

  // Better username generator
  const generateUsername = (uid) => {
    const adjectives = [
      "Cosmic",
      "Stellar",
      "Lunar",
      "Solar",
      "Nebular",
      "Galactic",
      "Astral",
      "Orbital",
      "Radiant",
      "Celestial",
      "Mystic",
      "Void",
      "Crystal",
      "Phoenix",
      "Shadow",
      "Light",
      "Storm",
      "Frost",
    ];

    const nouns = [
      "Explorer",
      "Voyager",
      "Wanderer",
      "Seeker",
      "Guardian",
      "Rider",
      "Hunter",
      "Warrior",
      "Sage",
      "Pioneer",
      "Nomad",
      "Dreamer",
      "Trader",
      "Miner",
      "Pilot",
      "Scout",
      "Knight",
      "Mage",
    ];

    // Use UID to create consistent but unique names
    const adjIndex = parseInt(uid.slice(0, 2), 36) % adjectives.length;
    const nounIndex = parseInt(uid.slice(2, 4), 36) % nouns.length;
    const number = parseInt(uid.slice(-3), 36) % 999;

    return `${adjectives[adjIndex]}${nouns[nounIndex]}${number}`;
  };

  // Enhanced avatar generator
  const getRandomAvatar = (uid) => {
    const avatars = [
      "🌙",
      "⭐",
      "🔥",
      "💎",
      "🚀",
      "⚡",
      "🎯",
      "🌟",
      "💫",
      "🌊",
      "🦋",
      "🐉",
      "🦅",
      "🐺",
      "🦊",
      "🐱",
      "🐸",
      "🦄",
      "🐢",
      "🦎",
      "👾",
      "🤖",
      "👽",
      "🎭",
      "🎪",
      "🎨",
      "🎵",
      "🎲",
      "🔮",
      "💀",
    ];

    // Use UID to get consistent avatar for each user
    const avatarIndex = parseInt(uid.slice(-2), 36) % avatars.length;
    return avatars[avatarIndex];
  };

  // Auto-scroll to bottom when new messages arrive - debounced
  useEffect(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [messages]);

  // Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: generateUsername(user.uid), // ← Better username
          avatar: getRandomAvatar(user.uid), // ← Consistent avatar
        });
        setLoading(false);
      } else {
        // Sign in anonymously
        signInAnonymously(auth).catch((error) => {
          console.error("Auth error:", error);
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to messages - optimized with better error handling
  useEffect(() => {
    if (!user) return;

    const messagesRef = collection(db, "chat-messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"), limit(25)); // Reduced from 50 to 25

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newMessages = [];
        snapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setMessages(newMessages.reverse());
      },
      (error) => {
        console.error("Firebase listener error:", error);
        // Fallback to reduce load
        setMessages([]);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const messagesRef = collection(db, "chat-messages");
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        userId: user.uid,
        userName: user.name,
        userAvatar: user.avatar,
        timestamp: serverTimestamp(),
        type: "message",
      });

      setNewMessage("");
      setShowEmojiPicker(false);
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Force new anonymous user (sign out and sign back in)
  const changeUsername = async () => {
    try {
      await auth.signOut();
      // This will trigger the auth state change and create a new anonymous user
      await signInAnonymously(auth);
      setShowNameChanger(false);
    } catch (error) {
      console.error("Error changing username:", error);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Message style based on user
  const getMessageStyle = (messageUserId) => {
    if (messageUserId === user?.uid) {
      return "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-100 ml-6 shadow-lg shadow-blue-500/10";
    }
    return "bg-base-200/60 backdrop-blur-sm border-base-content/20 text-base-content/90 hover:bg-base-200/80 transition-all duration-200";
  };

  // Quick emoji reactions
  const quickEmojis = [
    "😍",
    "🚀",
    "💎",
    "🔥",
    "⭐",
    "✨",
    "🌙",
    "💫",
    "👏",
    "💰",
  ];

  if (loading) {
    return (
      <div className="w-64 h-80 rounded-xl bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-purple-500/30 shadow-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-purple-200 font-medium">
            Connecting to MOONR chat...
          </p>
          <p className="text-xs text-purple-300/60 mt-1">
            Initializing secure connection
          </p>
        </div>
      </div>
    );
  }

  // Conditional wrapper - if tabbed, don't add the header/wrapper
  if (isTabbed) {
    return (
      <div className="h-full flex flex-col min-h-0">
        {/* Chat Messages - Fixed height and scrolling */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-3 space-y-2 bg-black/20 backdrop-blur-sm min-h-0"
          style={{
            maxHeight: "calc(100vh - 300px)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(168, 85, 247, 0.5) transparent",
          }}
        >
          {messages.length === 0 ? (
            <div className="text-center text-purple-200/80 text-sm py-8">
              <div className="text-3xl mb-3">💬</div>
              <div className="font-medium mb-2">Welcome to MOONR Chat</div>
              <div className="text-sm text-purple-300/60">
                Start the conversation!
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg p-2 border text-xs transition-all duration-300 hover:scale-[1.01] ${getMessageStyle(
                  msg.userId
                )}`}
              >
                <div className="flex items-start gap-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="font-bold text-xs text-purple-300 truncate">
                        {msg.userName}
                      </span>
                      {msg.userId === user?.uid && (
                        <span className="text-[9px] bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded-full font-medium">
                          You
                        </span>
                      )}
                      <span className="text-[9px] text-white/50 font-mono">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <div className="text-xs leading-relaxed break-words">
                      {msg.text}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="bg-base-200/40 backdrop-blur-sm rounded-lg p-2 border border-base-content/10">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">💭</span>
                <div className="flex-1">
                  <span className="text-xs text-purple-300/80 font-medium">
                    Someone is typing
                  </span>
                  <div className="flex gap-1 mt-0.5">
                    <div className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-3 border-t border-purple-500/30 bg-black/20 backdrop-blur-sm flex-shrink-0">
          {/* Quick emoji bar */}
          {showEmojiPicker && (
            <div className="mb-2 flex gap-1 p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setNewMessage((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                    inputRef.current?.focus();
                  }}
                  className="text-base hover:scale-125 transition-transform duration-200 hover:bg-white/20 rounded p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-3 py-2 text-sm rounded border border-purple-500/30 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200/60 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 transition-all duration-200"
                maxLength={200}
                disabled={!user}
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 text-purple-300/60 hover:text-purple-200 transition-colors"
                >
                  😊
                </button>

                <button
                  type="submit"
                  disabled={!newMessage.trim() || !user}
                  className="px-3 py-1 text-sm font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-purple-500/25"
                >
                  💫
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-purple-200/60">
              <span>Enter to send • {200 - newMessage.length} chars</span>
              <span className="font-mono">Global</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Regular standalone component (existing code)
  return (
    <div className="w-64 min-w-0 max-w-full rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-purple-900/20 backdrop-blur-lg border border-purple-500/30 flex flex-col h-80 max-h-[900px]">
      {/* Header - Same height as info panel title */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 p-3 text-white flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <span className="font-bold text-base tracking-wide">
                  MOONR Chat
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNameChanger(!showNameChanger)}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded transition-all duration-200 backdrop-blur-sm"
                title="Change username"
              >
                <span className="text-sm">🎭</span>
              </button>

              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-sm font-mono">{messages.length}</span>
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="mt-2 flex items-center gap-2 text-sm text-white/90">
            <span>{user?.avatar}</span>
            <span className="font-medium truncate">{user?.name}</span>
            <span className="text-white/60">•</span>
            <span className="text-white/60">{onlineUsers} online</span>
          </div>
        </div>

        {/* Name changer dropdown */}
        {showNameChanger && (
          <div className="absolute top-full left-2 right-2 mt-1 p-3 bg-white/95 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl z-50">
            <div className="text-sm text-gray-700 mb-2 font-medium">
              Current: {user?.avatar} {user?.name}
            </div>
            <button
              onClick={changeUsername}
              className="w-full text-sm px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg"
            >
              🎲 Generate New Identity
            </button>
          </div>
        )}
      </div>

      {/* Chat Messages - Fixed height and scrolling */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 bg-black/20 backdrop-blur-sm min-h-0"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(168, 85, 247, 0.5) transparent",
        }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-purple-200/80 text-sm py-8">
            <div className="text-3xl mb-3">💬</div>
            <div className="font-medium mb-2">Welcome to MOONR Chat</div>
            <div className="text-sm text-purple-300/60">
              Start the conversation!
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg p-2 border text-xs transition-all duration-300 hover:scale-[1.01] ${getMessageStyle(
                msg.userId
              )}`}
            >
              <div className="flex items-start gap-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="font-bold text-xs text-purple-300 truncate">
                      {msg.userName}
                    </span>
                    {msg.userId === user?.uid && (
                      <span className="text-[9px] bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded-full font-medium">
                        You
                      </span>
                    )}
                    <span className="text-[9px] text-white/50 font-mono">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div className="text-xs leading-relaxed break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="bg-base-200/40 backdrop-blur-sm rounded-lg p-2 border border-base-content/10">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">💭</span>
              <div className="flex-1">
                <span className="text-xs text-purple-300/80 font-medium">
                  Someone is typing
                </span>
                <div className="flex gap-1 mt-0.5">
                  <div className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-purple-400/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-purple-500/30 bg-black/20 backdrop-blur-sm flex-shrink-0">
        {/* Quick emoji bar */}
        {showEmojiPicker && (
          <div className="mb-2 flex gap-1 p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
            {quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  setNewMessage((prev) => prev + emoji);
                  setShowEmojiPicker(false);
                  inputRef.current?.focus();
                }}
                className="text-base hover:scale-125 transition-transform duration-200 hover:bg-white/20 rounded p-1"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="space-y-2">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 text-sm rounded border border-purple-500/30 bg-white/10 backdrop-blur-sm text-white placeholder-purple-200/60 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 transition-all duration-200"
              maxLength={200}
              disabled={!user}
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 text-purple-300/60 hover:text-purple-200 transition-colors"
              >
                😊
              </button>

              <button
                type="submit"
                disabled={!newMessage.trim() || !user}
                className="px-3 py-1 text-sm font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                💫
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-purple-200/60">
            <span>Enter to send • {200 - newMessage.length} chars</span>
            <span className="font-mono">Global</span>
          </div>
        </form>
      </div>
    </div>
  );
}
