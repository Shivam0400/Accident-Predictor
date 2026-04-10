import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, LayoutDashboard, BrainCircuit, Activity, Clock, FileBarChart2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const routes = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/map', name: 'Smart Map', icon: <Map size={20} /> },
    { path: '/predict', name: 'Prediction', icon: <BrainCircuit size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <Activity size={20} /> },
    { path: '/time', name: 'Time Analysis', icon: <Clock size={20} /> },
    { path: '/cause', name: 'Cause Analysis', icon: <FileBarChart2 size={20} /> },
    { path: '/admin', name: 'Admin', icon: <Settings size={20} /> },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="h-screen w-64 glass-panel border-r-0 border-t-0 border-b-0 rounded-none rounded-r-2xl flex flex-col pt-8 pb-4 absolute z-50 shadow-[5px_0_20px_rgba(0,0,0,0.05)]"
    >
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neon-blue shadow-glow-blue flex items-center justify-center">
          <Activity size={18} className="text-white" />
        </div>
        <h1 className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-accent-pink">
          AI PREDICT
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-slate-100 text-neon-purple shadow-sm border border-neon-purple/20' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            {route.icon}
            <span className="font-medium">{route.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="px-6 mt-auto">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">System Online</span>
        </div>
      </div>
    </motion.div>
  );
};
