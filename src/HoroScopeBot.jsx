import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, X } from 'lucide-react';
import axios from 'axios';

const HOROSCOPE_API_BASE = 'https://cors-proxy.fringe.zone/https://horoscope-app-api.vercel.app/api/v1/get-horoscope';

class HoroscopeClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error.message);
      throw error;
    }
  }

  async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
  }

  handleStream(streamUrl, onUpdate, onClose, onError) {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = event => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = event => {
      console.error('Stream Error:', event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose('Stream closed');
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
    try {
      const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
      console.log('Init Response:', initResponse);
      if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
        const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error('Error running flow:', error);
      onError('Error initiating session');
    }
  }
}

export default function HoroScopeBot({ showBot, setShowBot, onSwitchBot, currentBot }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showBot && chatContainerRef.current) {
      chatContainerRef.current.classList.add('scroll-effect');
    }
  }, [showBot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const horoscopeClient = new HoroscopeClient(
        'https://cors-proxy.fringe.zone/https://api.langflow.astra.datastax.com',
        'AstraCS:qwXOQoroYnJZzMoqxqLXnsBr:07cc00c5515ecc77cf266746cb6aa4ebeb2ad06706e2332a972019a43f9993a7'
      );

      const tweaks = {
        "File-7GXBx": {},
        "ChatOutput-Cu2Z9": {},
        "ParseData-8TCp3": {},
        "GroqModel-06JmJ": {},
        "AstraDB-zEqHu": {},
        "AstraDB-wJ7jO": {},
        "SplitText-BzbCz": {},
        "Prompt-B9iDi": {},
        "ChatInput-FFeJU": {},
        "AstraDBChatMemory-Hizme": {},
        "Memory-T7UV5": {}
      };

      const response = await horoscopeClient.runFlow(
        'horoscope_ai',
        'f829f83f-e4c3-4742-89d5-9ddee4394fb0',
        inputMessage,
        'chat',
        'chat',
        tweaks,
        false,
        (data) => console.log("Received:", data.chunk),
        (message) => console.log("Stream Closed:", message),
        (error) => console.error(error)
      );

      // Extract sign from user message
      const signMatch = inputMessage.match(/(?:about|for) (\w+)/i);
      const sign = signMatch ? signMatch[1].toLowerCase() : null;

      if (sign) {
        try {
          // Fetch horoscope data from API
          const [daily, weekly, monthly] = await Promise.all([
            axios.get(`${HOROSCOPE_API_BASE}/daily?sign=${sign}&day=TODAY`, { headers: { 'accept': 'application/json' } }),
            axios.get(`${HOROSCOPE_API_BASE}/weekly?sign=${sign}`, { headers: { 'accept': 'application/json' } }),
            axios.get(`${HOROSCOPE_API_BASE}/monthly?sign=${sign}`, { headers: { 'accept': 'application/json' } })
          ]);

          const horoscopeData = {
            daily: daily.data.data.horoscope_data,
            weekly: weekly.data.data.horoscope_data,
            monthly: monthly.data.data.horoscope_data
          };

          // Combine AI response with horoscope data
          const combinedResponse = {
            aiResponse: response?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text,
            horoscopeData
          };

          const botMessage = {
            type: 'bot',
            content: `${combinedResponse.aiResponse}\n\nHere are your horoscopes:\n\nDaily: ${combinedResponse.horoscopeData.daily}\n\nWeekly: ${combinedResponse.horoscopeData.weekly}\n\nMonthly: ${combinedResponse.horoscopeData.monthly}`
          };
          console.log(botMessage.content);
          setMessages(prev => [...prev, botMessage]);
        } catch (error) {
          console.error('Error fetching horoscope:', error);
        }
      } else if (response?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text) {
        const botMessage = {
          type: 'bot',
          content: response.outputs[0].outputs[0].outputs.message.message.text
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {showBot && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.95 }}
          animate={{ opacity: 1, y: 20, scale: 1 }}
          exit={{ opacity: 1, y: 20, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 w-96 h-[500px] backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col"
        >
          <div className="p-4 backdrop-blur-sm bg-purple-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-purple-300" />
              <h3 className="text-lg font-bold text-purple-200">Horoscope AI Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSwitchBot(currentBot === 'geeta' ? 'horoscope' : 'geeta')}
                className="text-purple-300 hover:text-purple-100"
              >
                <MessageSquare className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowBot(false)}
                className="text-purple-300 hover:text-purple-100"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-purple-900/30 text-purple-200'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-start"
              >
                <div className="bg-purple-900/30 text-purple-200 p-3 rounded-xl flex items-center gap-2">
                  <span>Thinking</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  >
                    .
                  </motion.span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 backdrop-blur-sm bg-purple-900/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about your horoscope..."
                className="flex-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}