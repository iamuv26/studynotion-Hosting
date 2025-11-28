import React, { useState, useRef, useEffect } from "react"
import { BsChatDots, BsSend, BsX, BsStars, BsPerson } from "react-icons/bs"
import { useSelector } from "react-redux"
import { apiConnector } from "../../services/apiConnector"
import { aiEndpoints } from "../../services/apis"
import { toast } from "react-hot-toast"

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm StudyNotion AI. I can help you with login issues, explain coding syntax, or answer course questions. How can I help?",
            sender: "system",
        },
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const { user } = useSelector((state) => state.profile)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, loading])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: "user",
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            const response = await apiConnector("POST", aiEndpoints.AI_CHAT_API, {
                prompt: input,
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const systemMessage = {
                id: Date.now() + 1,
                text: response.data.data,
                sender: "system",
            }
            setMessages((prev) => [...prev, systemMessage])
        } catch (error) {
            console.error("AI Chat Error:", error)
            const errorMessage = {
                id: Date.now() + 1,
                text: "Sorry, I encountered an error. Please try again later.",
                sender: "system",
            }
            setMessages((prev) => [...prev, errorMessage])
            toast.error("Failed to get response from AI")
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !loading) {
            handleSend()
        }
    }

    return (
        <div className="fixed bottom-8 right-8 z-[1000]">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 flex h-[500px] w-[320px] flex-col overflow-hidden rounded-2xl border border-richblack-700/50 shadow-2xl transition-all duration-300 sm:w-[380px] glass-effect animate-slide-up">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-richblack-900 p-4 shadow-md border-b border-richblack-700">
                        <div className="flex items-center gap-2 text-white">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-800 border border-richblack-700">
                                <BsStars size={18} />
                            </div>
                            <h3 className="text-lg font-bold tracking-wide">StudyNotion AI</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1 text-white/80 transition-all hover:bg-richblack-800 hover:text-white"
                        >
                            <BsX size={24} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-richblack-600">
                        <div className="flex flex-col gap-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                        } animate-slide-up`}
                                >
                                    {msg.sender === "system" && (
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-richblack-900 text-white shadow-sm border border-richblack-700">
                                            <BsStars size={14} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.sender === "user"
                                            ? "bg-richblack-5 text-richblack-900 rounded-br-none"
                                            : "bg-richblack-800 text-richblack-5 backdrop-blur-sm border border-richblack-700 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>

                                    {msg.sender === "user" && (
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-richblack-700 text-richblack-25 border border-richblack-600">
                                            {user?.image ? (
                                                <img src={user.image} alt="user" className="h-full w-full rounded-full object-cover" />
                                            ) : (
                                                <BsPerson size={16} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {loading && (
                                <div className="flex items-end gap-2 animate-slide-up">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-richblack-900 text-white shadow-sm border border-richblack-700">
                                        <BsStars size={14} />
                                    </div>
                                    <div className="bg-richblack-800 text-richblack-5 backdrop-blur-sm border border-richblack-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <div className="h-2 w-2 rounded-full bg-richblack-400 animate-bounce-dot" style={{ animationDelay: '0s' }}></div>
                                            <div className="h-2 w-2 rounded-full bg-richblack-400 animate-bounce-dot" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="h-2 w-2 rounded-full bg-richblack-400 animate-bounce-dot" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-richblack-700/50 bg-richblack-900/90 p-4 backdrop-blur-md">
                        <div className="flex items-center gap-2 rounded-full bg-richblack-800 border border-richblack-700 p-1.5 pl-4 shadow-inner">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                disabled={loading}
                                className="flex-1 bg-transparent text-sm text-richblack-5 placeholder-richblack-400 focus:outline-none disabled:opacity-50"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading}
                                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${input.trim()
                                    ? "bg-richblack-5 text-richblack-900 shadow-md hover:scale-105"
                                    : "bg-richblack-700 text-richblack-400"
                                    } disabled:opacity-50 disabled:hover:scale-100`}
                            >
                                <BsSend size={14} className={input.trim() ? "ml-0.5" : ""} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-richblack-900 text-white shadow-lg border border-richblack-700 transition-all duration-300 hover:scale-110 hover:shadow-richblack-900/50"
            >
                {isOpen ? (
                    <BsX size={32} className="transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                    <BsStars size={28} className="animate-pulse" />
                )}
            </button>
        </div>
    )
}

export default AIChatWidget
