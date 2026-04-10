import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { feature: 'Time of Day', importance: 0.85 },
  { feature: 'Weather', importance: 0.65 },
  { feature: 'Traffic Density', importance: 0.45 },
  { feature: 'Road Type', importance: 0.35 },
  { feature: 'Visibility', importance: 0.25 },
];

const Analytics = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">MODEL ANALYTICS</h1>
        <p className="text-slate-500 mt-2 font-medium">SHAP Feature Importance & Model Evaluation Metrics</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">Global Feature Importance (XGBoost)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="feature" type="category" stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="importance" fill="#8A2BE2" radius={[0, 6, 6, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-6 flex flex-col shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">Confusion Matrix Performance</h3>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 text-center w-full max-w-md">
                  <div className="bg-neon-blue/10 p-6 rounded-xl border border-neon-blue/30 shadow-sm transition-transform hover:scale-105">
                      <p className="text-sm text-slate-600 font-semibold mb-1">True Positives</p>
                      <p className="text-4xl font-black text-neon-blue">1,245</p>
                  </div>
                  <div className="bg-accent-pink/10 p-6 rounded-xl border border-accent-pink/30 shadow-sm transition-transform hover:scale-105">
                      <p className="text-sm text-slate-600 font-semibold mb-1">False Positives</p>
                      <p className="text-4xl font-black text-accent-pink">89</p>
                  </div>
                  <div className="bg-accent-pink/10 p-6 rounded-xl border border-accent-pink/30 shadow-sm transition-transform hover:scale-105">
                      <p className="text-sm text-slate-600 font-semibold mb-1">False Negatives</p>
                      <p className="text-4xl font-black text-accent-pink">42</p>
                  </div>
                  <div className="bg-neon-blue/10 p-6 rounded-xl border border-neon-blue/30 shadow-sm transition-transform hover:scale-105">
                      <p className="text-sm text-slate-600 font-semibold mb-1">True Negatives</p>
                      <p className="text-4xl font-black text-neon-blue">8,930</p>
                  </div>
              </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Analytics;
