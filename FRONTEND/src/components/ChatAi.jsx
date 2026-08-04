import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, UserRound } from "lucide-react";

function ChatAi({problem}) {
   const [messages, setMessages] = useState([
    {
        role: "model",
        parts: [
            {
                text:
                    "👋 Hi! I'm DevShala AI.\n\nAsk me for:\n\n- Hints\n- Brute Force\n- Optimal Solution\n- Code Review\n- Complexity Analysis"
            }
        ]
    }
])

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset,formState: {errors} } = useForm();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

const onSubmit = async (data) => {

    const updatedMessages = [
        ...messages,
        {
            role: "user",
            parts: [
                {
                    text: data.message
                }
            ]
        }
    ];

    // Update UI immediately
    setMessages(updatedMessages);

    reset();

    try {

        setLoading(true);
        const response = await axiosClient.post("/ai/chat", {
            messages: updatedMessages,
            title: problem.title,
            description: problem.description,
            testCases: problem.visibleTestCases,
            startCode: problem.startCode
        });

        setMessages(prev => [
            ...prev,
            {
                role: "model",
                parts: [
                    {
                        text: response.data.message
                    }
                ]
            }
        ]);

    } catch (err) {
        console.error(err);

        setMessages(prev => [
            ...prev,
            {
                role: "model",
                parts: [
                    {
                        text: "Error from AI Chatbot"
                    }
                ]
            }
        ]);
    }
    setLoading(false);
};

   



   return (
  <div className="flex flex-col h-[80vh] bg-base-100 rounded-xl border border-base-300 overflow-hidden">

    

    {/* Header */}
    <div className="border-b border-base-300 px-6 py-4 bg-base-200">
      <h2 className="text-xl font-bold">🤖 DevShala AI</h2>
      <p className="text-sm text-base-content/70">
        Ask for hints, brute force, optimal solution, code review or complexity analysis.
      </p>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
         {loading && (
    <div className="chat chat-start">
        <div className="chat-bubble bg-base-200">
            <span className="loading loading-dots loading-md"></span>
        </div>
    </div>
)}

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${
            msg.role === "user" ? "chat-end" : "chat-start"
          }`}
        >
         {/* Avatar */}
        <div className="chat-image avatar">
        <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
            msg.role === "user"
                ? "bg-primary text-primary-content"
                : "bg-secondary text-secondary-content"
            }`}
        >
            {msg.role === "user" ? (
            <UserRound size={18} strokeWidth={2.2} />
            ) : (
            <Bot size={18} strokeWidth={2.2} />
            )}
        </div>
        </div>

          {/* Header */}
          <div className="chat-header text-sm mb-1">
            {msg.role === "user" ? "You" : "DevShala AI"}
          </div>

          {/* Bubble */}
          <div
            className={`chat-bubble max-w-2xl shadow-md ${
              msg.role === "user"
                ? "chat-bubble-primary"
                : "bg-base-200 text-base-content"
            }`}
          >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {msg.parts[0].text}
        </ReactMarkdown>
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-t border-base-300 bg-base-100 p-4"
    >
      <div className="flex items-center gap-3">

        <input

          type="text"
          disabled={loading}
          placeholder="Ask anything about this problem..."
          className="input input-bordered w-full rounded-full"
          {...register("message", {
            required: true,
            minLength: 2,
          })}
        />

        <button
          type="submit"
          className="btn btn-primary rounded-full"
          disabled={errors.message ||loading }
        >
          <Send size={18} />
        </button>

      </div>
    </form>
  </div>
);
}

export default ChatAi;