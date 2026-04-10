import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const hourlyData = Array.from({length: 24}, (_, i) => ({
    hour: `${i}:00`,
    risk: Math.max(10, Math.sin(i / 3) * 40 + 50 + Math.random() * 10)
}));

const TimeAnalysis = () => {
    const [sliderVal, setSliderVal] = useState(12);

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-accent-pink tracking-wider">TEMPORAL ANALYSIS</h1>
                <p className="text-slate-500 mt-2 font-medium">Hourly Accident Risk Assessment Simulator</p>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel p-8 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="hour" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="risk" stroke="#FF2E63" strokeWidth={4} dot={false} activeDot={{r: 8, fill: '#FF2E63'}} />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel p-8 text-center flex flex-col items-center">
                 <h3 className="font-bold text-slate-800 mb-6">Interactive Time Matrix</h3>
                 <input 
                    type="range" min="0" max="23" 
                    value={sliderVal} 
                    onChange={(e) => setSliderVal(e.target.value)} 
                    className="w-full max-w-2xl h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-neon-blue" 
                 />
                 <p className="mt-6 text-4xl font-black text-neon-purple drop-shadow-sm">{sliderVal}:00 Hrs</p>
            </motion.div>
        </div>
    )
}
export default TimeAnalysis;
