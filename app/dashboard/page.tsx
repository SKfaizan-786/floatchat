"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, BarChart3, Map, TrendingUp, Waves, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OceanChart } from "@/components/charts/ocean-chart";
import { LeafletArgoMap } from "@/components/charts/leaflet-argo-map";
import { sendMessageToGroq, generateMockArgoData, ChatMessage, ArgoDataResponse } from "@/lib/groq";

export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m FloatChat, your AI assistant for ARGO ocean data analysis. Ask me about temperature profiles, salinity data, or any oceanographic questions!',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState<ArgoDataResponse | null>(null);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      // Generate visualization data based on query
      const vizData = generateMockArgoData(input);
      setCurrentVisualization(vizData);

      // Get AI response (now returns natural language)
      const response = await sendMessageToGroq([...messages, userMessage]);
      
      // Check if AI wants to generate a chart
      let cleanResponse = response;
      if (response.includes('GENERATE_CHART')) {
        cleanResponse = response.replace('GENERATE_CHART', '').trim();
        // The vizData was already generated above based on keywords
      }
      
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: cleanResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden gradient-ocean-deep">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between p-6 border-b border-blue-800/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <Waves className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">FloatChat Dashboard</h1>
              <p className="text-blue-300 text-sm">AI-Powered Ocean Data Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Connected</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Fixed Layout */}
        <div className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-0">
          {/* Chat Panel - Full Height */}
          <motion.div 
            className="xl:col-span-1 flex flex-col min-h-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="flex-1 glass-card border-blue-700/30 flex flex-col min-h-0">
              <div className="p-4 border-b border-blue-700/30 flex-shrink-0">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Chat with FloatChat
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-700 text-blue-100'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {mounted && (
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp?.toLocaleTimeString('en-US', { 
                              hour12: false, 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-700 p-3 rounded-lg flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span className="text-blue-100 text-sm">FloatChat is thinking...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-blue-700/30 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about ocean data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 px-4"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Quick Query Suggestions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Temperature profile', 'Salinity data', 'Float locations'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="text-xs bg-blue-800/50 text-blue-200 px-2 py-1 rounded hover:bg-blue-700/50 transition-colors"
                      disabled={isLoading}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Visualization Panel - 2 columns */}
          <motion.div 
            className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Chart Section */}
            <Card className="glass-card border-blue-700/30 flex flex-col">
              <div className="p-4 border-b border-blue-700/30 flex-shrink-0">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Data Visualization
                </h3>
              </div>
              <div className="p-4 flex-1 min-h-[400px]">
                {currentVisualization?.type === 'chart' ? (
                  <OceanChart 
                    data={currentVisualization.data}
                    title="Ocean Data Profile"
                    xAxisLabel="Depth (m)"
                    yAxisLabel="Value"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-blue-300">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Ask about temperature or salinity profiles to see visualizations</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Map Section */}
            <Card className="glass-card border-blue-700/30 flex flex-col">
              <div className="p-4 border-b border-blue-700/30 flex-shrink-0">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Map className="h-5 w-5 text-blue-400" />
                  ARGO Float Locations
                </h3>
              </div>
              <div className="p-4 flex-1 min-h-[400px]">
                {currentVisualization?.type === 'map' ? (
                  <LeafletArgoMap data={currentVisualization.data} />
                ) : (
                  <div className="flex items-center justify-center h-full text-blue-300">
                    <div className="text-center">
                      <Map className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Ask about specific regions to see ARGO float locations</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
