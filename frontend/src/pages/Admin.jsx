import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, ServerCog, Database, CheckCircle } from 'lucide-react';

const Admin = () => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col gap-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-3xl font-black text-slate-800 tracking-wider">SYSTEM ADMINISTRATION</h1>
                <p className="text-slate-500 mt-2 font-medium">Manage dataset states and trigger manual model retraining.</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrag}
              className={`glass-panel border-dashed border-2 p-16 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragActive ? 'border-neon-blue bg-neon-blue/5' : 'border-slate-300 hover:bg-slate-50/50'}`}
            >
                 <UploadCloud size={64} className={`${dragActive ? 'text-neon-blue' : 'text-slate-400'} mb-4 transition-colors`} />
                 <h3 className="text-2xl font-bold text-slate-700">Drag & Drop new Dataset CSV</h3>
                 <p className="text-slate-500 mt-2">Max file size: 500MB</p>
                 <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm">
                   <Database size={16} /> Currently injected: <span className="font-bold text-slate-800">US_Accidents_Merged.csv (1.2GB)</span>
                 </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-4"><ServerCog className="text-neon-purple"/> Neural Engine Controls</h3>
                
                <div className="flex flex-col md:flex-row gap-8 mt-6">
                    <div className="flex-1">
                        <p className="text-slate-600 mb-6 font-medium leading-relaxed">Initialize a new training cycle for the XGBoost global model using the currently loaded dataset. <br/><br/><span className="text-accent-pink font-bold text-sm bg-accent-pink/10 px-2 py-1 rounded">Warning: Computationally Intensive</span></p>
                        <button 
                            onClick={() => setUploading(true)}
                            disabled={uploading}
                            className={`cyber-button px-6 py-3 w-48 flex items-center justify-center gap-2 ${uploading && 'opacity-50 cursor-not-allowed'}`}
                        >
                            {uploading ? "TRAINING..." : "TRAIN MODEL"}
                        </button>
                    </div>

                    <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        {uploading ? (
                            <div className="h-full flex flex-col justify-center">
                                <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold uppercase">
                                    <span>Epochs Completed: 45/100</span>
                                    <span className="text-neon-purple">45%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-neon-purple animate-pulse" style={{ width: '45%' }} />
                                </div>
                                <p className="text-xs text-slate-400 mt-4 font-mono font-bold">INFO: Calculating log-loss gradients...</p>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                                <CheckCircle size={48} className="mb-2 text-emerald-400" />
                                <p className="font-bold text-slate-700">Model is up to date.</p>
                                <p className="text-sm">Accuracy: 94.2%</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
export default Admin;
