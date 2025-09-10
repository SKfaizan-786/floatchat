"use client";

import * as React from "react";
import { useState } from "react";
import { MessageSquare, Send, LogOut, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

// Mock data for chat
const mockChat = [
  { type: "user", text: "Show me salinity profiles near the equator in March 2023" },
  { type: "ai", text: "Here are the salinity profiles near the equator in March 2023" },
  { type: "user", text: "Compare BGC parameters in the Arabian Sea for the last 6 months" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      console.log("Sending message:", input);
      setInput("");
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="min-h-screen relative overflow-hidden gradient-ocean-deep p-6 sm:p-12 lg:p-24 flex flex-col items-center">
      {/* Background mesh gradient matching landing page */}
      <div className="absolute inset-0 gradient-mesh opacity-30"></div>
      
      {/* Header */}
      <div className="w-full flex justify-between items-center max-w-7xl mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white">FloatChat</h1>
          <span className="text-lg text-blue-200 hidden sm:block">ARGO Data</span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-center mb-8 relative z-10">
        <p className="text-blue-200 text-lg">AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization</p>
      </div>

      {/* Main Dashboard Layout */}
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Chat Interface */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col h-[600px] border border-blue-700/30">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {mockChat.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-xl ${
                  message.type === "user"
                    ? "bg-blue-800/50 text-blue-100 ml-4"
                    : "bg-cyan-800/50 text-cyan-100 mr-4"
                }`}
              >
                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full ${
                  message.type === "user" ? "bg-blue-500" : "bg-cyan-400"
                }`}>
                  {message.type === "user" ? (
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  ) : (
                    <MessageSquare size={16} className="text-white" />
                  )}
                </div>
                <p className="flex-1 leading-relaxed">{message.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-3 mt-auto">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-blue-900/60 border border-blue-700/40 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              size="icon"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-blue-700/30 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Float Trajectory</h3>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleZoomIn}
                className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-colors"
                size="icon"
              >
                <Plus size={16} />
              </Button>
              <Button 
                onClick={handleZoomOut}
                className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-colors"
                size="icon"
              >
                <Minus size={16} />
              </Button>
            </div>
          </div>
          <div className="w-full h-96 bg-blue-900/50 rounded-lg overflow-hidden relative">
            {/* India Map Outline (SVG) */}
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
            >
              {/* Ocean background */}
              <rect width="400" height="200" fill="#1e3a8a" />
              {/* India shape (simplified) */}
              <path d="M220 60 L230 80 L225 100 L235 120 L240 140 L230 160 L210 170 L200 150 L190 130 L200 110 L210 90 Z" fill="#2d6a4f" />
              {/* Float trajectories (mock) */}
              <g stroke="#38bdf8" strokeWidth="2" fill="none">
                <path d="M210 90 C215 100, 220 110, 225 120 C230 130, 235 140, 230 150" strokeDasharray="3,2" />
                <path d="M200 110 C205 120, 210 130, 215 140 C220 150, 225 160, 220 170" strokeDasharray="3,2" />
              </g>
              {/* Float positions (mock) */}
              <g fill="#00e5ff">
                <circle cx="210" cy="90" r="3" />
                <circle cx="225" cy="120" r="3" />
                <circle cx="230" cy="150" r="3" />
                <circle cx="200" cy="110" r="3" />
                <circle cx="215" cy="140" r="3" />
                <circle cx="220" cy="170" r="3" />
              </g>
            </svg>
          </div>
        </div>

        {/* Salinity Profile Panel */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6 border border-blue-700/30">
          <h3 className="text-xl font-semibold text-white mb-4">Salinity Profile</h3>
          <div className="w-full h-96 bg-blue-900/50 rounded-lg p-4">
            <svg viewBox="0 0 300 400" className="w-full h-full">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="30" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="300" height="400" fill="url(#grid)" />
              
              {/* Axes */}
              <line x1="50" y1="50" x2="50" y2="350" stroke="#ffffff" strokeWidth="2" />
              <line x1="50" y1="350" x2="250" y2="350" stroke="#ffffff" strokeWidth="2" />
              
              {/* Y-axis labels (Depth) */}
              <text x="40" y="60" fill="#ffffff" fontSize="12" textAnchor="end">0</text>
              <text x="40" y="140" fill="#ffffff" fontSize="12" textAnchor="end">20</text>
              <text x="40" y="220" fill="#ffffff" fontSize="12" textAnchor="end">40</text>
              <text x="40" y="300" fill="#ffffff" fontSize="12" textAnchor="end">60</text>
              <text x="40" y="350" fill="#ffffff" fontSize="12" textAnchor="end">100</text>
              
              {/* X-axis labels (Salinity PSU) */}
              <text x="80" y="370" fill="#ffffff" fontSize="12" textAnchor="middle">34.5</text>
              <text x="150" y="370" fill="#ffffff" fontSize="12" textAnchor="middle">35</text>
              <text x="220" y="370" fill="#ffffff" fontSize="12" textAnchor="middle">35.5</text>
              
              {/* Axis labels */}
              <text x="20" y="200" fill="#ffffff" fontSize="14" textAnchor="middle" transform="rotate(-90 20 200)">Depth (dbar)</text>
              <text x="150" y="390" fill="#ffffff" fontSize="14" textAnchor="middle">Salinity (PSU)</text>
              
              {/* Salinity profiles */}
              <g stroke="#38bdf8" strokeWidth="2" fill="none">
                <path d="M70 50 C75 80, 80 120, 85 160 C90 200, 95 240, 100 280 C105 320, 110 340, 115 350" />
                <path d="M90 50 C95 80, 100 120, 105 160 C110 200, 115 240, 120 280 C125 320, 130 340, 135 350" />
                <path d="M110 50 C115 80, 120 120, 125 160 C130 200, 135 240, 140 280 C145 320, 150 340, 155 350" />
                <path d="M130 50 C135 80, 140 120, 145 160 C150 200, 155 240, 160 280 C165 320, 170 340, 175 350" />
              </g>
              
              {/* Data points */}
              <g fill="#00e5ff">
                <circle cx="70" cy="50" r="2" />
                <circle cx="85" cy="160" r="2" />
                <circle cx="100" cy="280" r="2" />
                <circle cx="115" cy="350" r="2" />
                <circle cx="90" cy="50" r="2" />
                <circle cx="105" cy="160" r="2" />
                <circle cx="120" cy="280" r="2" />
                <circle cx="135" cy="350" r="2" />
                <circle cx="110" cy="50" r="2" />
                <circle cx="125" cy="160" r="2" />
                <circle cx="140" cy="280" r="2" />
                <circle cx="155" cy="350" r="2" />
                <circle cx="130" cy="50" r="2" />
                <circle cx="145" cy="160" r="2" />
                <circle cx="160" cy="280" r="2" />
                <circle cx="175" cy="350" r="2" />
              </g>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
