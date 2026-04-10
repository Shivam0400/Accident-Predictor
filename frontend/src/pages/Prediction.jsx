import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Loader2, Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { predictSeverity } from '../services/api';

const Prediction = () => {
  const [formData, setFormData] = useState({
    weather: 'clear',
    traffic: 'low',
    time: '12:00',
    road_type: 'highway'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictSeverity(formData);
      setResult(res);
    } catch (err) {
      alert("Prediction API failed. Ensure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col gap-8">
       <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple tracking-wider">AI PREDICTION ENGINE</h1>
        <p className="text-slate-500 mt-2 font-medium">Input real-time environmental parameters to generate AI risk analysis arrays.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-panel p-8">
          <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6 flex items-center gap-2">
            <BrainCircuit className="text-neon-purple" /> Input Parameters
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Weather Condition</label>
              <select className="w-full p-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neon-blue text-slate-800" onChange={e => setFormData({...formData, weather: e.target.value})}>
                <option value="clear">Clear Skies</option>
                <option value="rain">Heavy Rain</option>
                <option value="fog">Fog / Low Visibility</option>
                <option value="snow">Snow / Ice</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Traffic Density</label>
              <select className="w-full p-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neon-blue text-slate-800" onChange={e => setFormData({...formData, traffic: e.target.value})}>
                <option value="low">Low (Free Flow)</option>
                <option value="medium">Medium</option>
                <option value="high">High (Bumper to Bumper)</option>
              </select>
            </div>
            <div>
               <label className="block text-sm font-bold text-slate-600 mb-2">Time of Day</label>
               <input type="time" defaultValue="12:00" className="w-full p-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-neon-blue text-slate-800" onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="w-full cyber-button mt-6 py-4 flex justify-center items-center gap-3 text-white text-lg">
              {loading ? <Loader2 className="animate-spin" size={24} /> : <BrainCircuit size={24} />}
              {loading ? "INITIALIZING TENSORS..." : "RUN NEURAL PREDICTION"}
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-6">
          {result ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-8 border-t-4 border-neon-blue flex flex-col items-center justify-center text-center h-full">
               <Gauge size={64} className="text-neon-blue mb-6" />
               <h3 className="text-2xl font-bold text-slate-800 mb-4">Calculated Risk Score</h3>
               <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-accent-pink drop-shadow-md tracking-tighter">
                 {result.risk_score}<span className="text-4xl text-slate-400">%</span>
               </div>
               
               <div className="mt-8 w-full bg-slate-100 p-4 rounded-xl border border-slate-200 text-left">
                  <p className="text-slate-800 font-medium flex items-center gap-2 mb-2">
                    <AlertTriangle size={18} className="text-accent-pink" /> 
                    Estimated Severity: <span className="text-accent-pink font-bold">{result.severity}</span>
                  </p>
                  <p className="text-slate-600 text-sm mb-2 font-bold mt-4">AI Safety Directives:</p>
                  <ul className="space-y-2">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-neon-blue mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
               </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 flex flex-col items-center justify-center h-full text-slate-400 border-dashed">
               <BrainCircuit size={64} className="opacity-20 mb-4" />
               <p className="text-lg font-medium text-center">Awaiting parameters.<br/>Input data to activate the prediction engine.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Prediction;
