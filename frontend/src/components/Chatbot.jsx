import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! How can I help you find your dream job today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI bot response
        setIsTyping(true);
        setTimeout(() => {
            const text = input.toLowerCase();
            let responseText = "That's an interesting question! Could you provide a bit more detail about what you're looking for on JobPortal?";
            
            if (text.match(/hi|hello|hey/)) responseText = "Hello there! How can I assist you with your career goals today?";
            else if (text.match(/apply|application/)) responseText = "To apply for a job, navigate to 'Browse Jobs', click on a job you like, and hit the 'Apply Now' button on the details page!";
            else if (text.match(/post|employer|recruiter/)) responseText = "If you're an employer, you can create a Recruiter account to access the dashboard and post jobs directly.";
            else if (text.match(/salary|pay|money/)) responseText = "Salary details are listed directly on each job posting. You can filter jobs by salary on the Jobs page.";
            else if (text.match(/login|signup|account|register/)) responseText = "You can create an account or login using the buttons in the top right corner. We also support Google Login!";
            else if (text.match(/contact|support|email/)) responseText = "You can reach our main support anytime at agrawalsanskar60@gmail.com or call us at +91 7668879430.";
            else if (text.match(/resume|cv/)) responseText = "You can upload your resume (PDF/Doc) directly when applying for a specific job, or update it in your Profile section!";
            else if (text.match(/forgot password|password/)) responseText = "If you forgot your password, please use the 'Forgot Password' link on the login page to reset it.";
            else if (text.match(/thank/)) responseText = "You're very welcome! Let me know if you need anything else.";
            else if (text.match(/job|work|intern/)) responseText = "We have thousands of active jobs! Click on 'Browse Jobs' at the top to start searching for your next big opportunity.";

            const botMsg = { 
                id: Date.now() + 1, 
                text: responseText, 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000 + Math.random() * 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-indigo-500/20" style={{ height: '450px' }}>
                    {/* Header */}
                    <div className="bg-indigo-600/80 p-4 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-white" />
                            <h3 className="font-semibold text-white">JobPortal Support</h3>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        msg.sender === 'user' 
                                        ? 'bg-indigo-600 text-white rounded-br-none' 
                                        : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 text-gray-200 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center h-10">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-slate-900/50 border-t border-white/10">
                        <form onSubmit={handleSend} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <button 
                                type="submit"
                                disabled={!input.trim()}
                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 shrink-0"
                            >
                                <Send className="w-4 h-4 ml-1" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                aria-label="Toggle Chatbot"
            >
                <MessageSquare className="w-6 h-6" />
            </button>
        </div>
    );
};

export default Chatbot;
