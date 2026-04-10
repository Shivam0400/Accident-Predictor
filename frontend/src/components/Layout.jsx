import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden relative">
      {/* Animated Light Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Glowing animated orbs in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-pink/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-neon-purple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none" />
      
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 z-10 overflow-y-auto overflow-x-hidden relative">
        {children}
      </main>
    </div>
  );
};
