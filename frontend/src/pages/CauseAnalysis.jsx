import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Overspeeding', value: 45 },
  { name: 'Distracted Driving', value: 25 },
  { name: 'Weather Conditions', value: 20 },
  { name: 'DUI / Intoxication', value: 10 },
];
const COLORS = ['#FF2E63', '#8A2BE2', '#00BFFF', '#cbd5e1'];

const CauseAnalysis = () => {
    return (
        <div className="w-full h-full flex flex-col gap-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-3xl font-black text-slate-800 tracking-wider">CAUSE DIAGNOSTICS</h1>
                <p className="text-slate-500 mt-2 font-medium">Root cause probability distribution across severity zones.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-panel p-6 flex flex-col items-center justify-center relative">
                   <h3 className="absolute top-6 left-6 font-bold text-slate-800">Primary Incident Causes</h3>
                   <ResponsiveContainer width="100%" height="90%">
                      <PieChart>
                          <Pie 
                            data={data} 
                            innerRadius={100} 
                            outerRadius={150} 
                            paddingAngle={5} 
                            dataKey="value" 
                            stroke="none"
                            cx="50%"
                            cy="55%"
                          >
                              {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                          <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                   </ResponsiveContainer>
              </motion.div>
              
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-4">
                  {data.map((item, idx) => (
                     <div key={idx} className="glass-panel p-6 border-l-4" style={{borderLeftColor: COLORS[idx]}}>
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-slate-700">{item.name}</h4>
                            <span className="font-mono text-xl" style={{color: COLORS[idx]}}>{item.value}%</span>
                        </div>
                        <div className="mt-3 text-sm text-slate-500">
                          {idx === 0 && "Primary contributor to fatal severity incidents."}
                          {idx === 1 && "Increasing trend over past 24 months."}
                          {idx === 2 && "Highly correlated with low visibility hotspots."}
                          {idx === 3 && "Highest risk multi-vehicle collision causal factor."}
                        </div>
                     </div>
                  ))}
              </motion.div>
            </div>
        </div>
    )
}
export default CauseAnalysis;
