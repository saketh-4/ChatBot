import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am your assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const getBotResponse = (userInput) => {
  const input = userInput.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) return "Hello there! 😊";
  if (input.includes("how are you")) return "I'm just a bunch of code, but I'm doing great! 💻";
  if (input.includes("your name")) return "I’m a simple chatbot built in React!";
  if (input.includes("bye")) return "Goodbye! Have a wonderful day! 👋";

  if (input.includes("who created you")) return "I was built by my developer using React and Vite!";
  if (input.includes("what can you do")) return "I can chat with you and help with basic tasks. More features coming soon!";
  if (input.includes("tell me a joke")) return "Why don’t scientists trust atoms? Because they make up everything! 😄";
  if (input.includes("what is react")) return "React is a JavaScript library for building user interfaces, developed by Facebook.";
  if (input.includes("what is vite")) return "Vite is a lightning-fast build tool and development server for modern web projects.";

  if (input.includes("thank you") || input.includes("thanks")) return "You're welcome! 😊";
  if (input.includes("help")) return "Sure! Ask me anything or say something like 'what is React?' or 'tell me a joke'.";

  return "Sorry, I didn’t understand that. Try asking me something like 'what is React?' or 'tell me a joke'.";
};

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = { sender: "bot", text: getBotResponse(input) };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 1000); // Simulate typing delay
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Hi! I am your assistant. How can I help you today?" }]);
  };

  return (
    <>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, id) => (
            <div key={id} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message bot">Bot is typing...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={!input.trim()}>
            Send
          </button>
          <button onClick={clearChat} style={{ backgroundColor: "#f44336", color: "white" }}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
