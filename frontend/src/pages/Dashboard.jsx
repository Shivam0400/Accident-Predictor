import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, Activity, TrendingUp, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', risk: 40, accidents: 24 },
  { time: '04:00', risk: 30, accidents: 13 },
  { time: '08:00', risk: 80, accidents: 98 },
  { time: '12:00', risk: 60, accidents: 39 },
  { time: '16:00', risk: 90, accidents: 110 },
  { time: '20:00', risk: 50, accidents: 48 },
  { time: '23:59', risk: 45, accidents: 38 },
];

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-panel p-6 relative overflow-hidden group hover:border-slate-300 transition-colors bg-white"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 bg-${color} blur-2xl group-hover:opacity-20 transition-opacity`} />
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <h3 className="text-slate-500 font-medium tracking-wider text-sm uppercase">{title}</h3>
        <p className={`text-4xl font-bold mt-2 text-${color}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg bg-${color}/10 border border-${color}/20 text-${color}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 relative z-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-sm">System Overview</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TELEMETRY ACTIVE
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Risk Score" value="84.2" icon={<Activity size={24} />} color="neon-blue" delay={0.1} />
        <StatCard title="Predicted Hotspots" value="12" icon={<AlertOctagon size={24} />} color="accent-pink" delay={0.2} />
        <StatCard title="Severity Index" value="High" icon={<ShieldAlert size={24} />} color="neon-purple" delay={0.3} />
        <StatCard title="Incident Trend" value="+14%" icon={<TrendingUp size={24} />} color="neon-blue" delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 flex-1 min-h-[400px] bg-white"
      >
        <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">24-Hour Risk Prediction Model</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BFFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00BFFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#334155' }}
              />
              <Area type="monotone" dataKey="risk" stroke="#00BFFF" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
              <Area type="monotone" dataKey="accidents" stroke="#8A2BE2" strokeWidth={3} fillOpacity={1} fill="url(#colorAccidents)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
