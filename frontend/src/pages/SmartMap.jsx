import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, useMap, CircleMarker, Circle } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Navigation, Crosshair, AlertTriangle } from 'lucide-react';
import { getGeospatialHotspots } from '../services/api';
import 'leaflet/dist/leaflet.css';

// Component to dynamically recenter map
function LocationMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      // Zoom level 17 provides a much closer street-level view for auto-detect
      map.flyTo(position, 17, { duration: 2 });
    }
  }, [position, map]);

  return position === null ? null : (
    <CircleMarker 
      center={position} 
      radius={12} 
      pathOptions={{ color: '#00BFFF', fillColor: '#00BFFF', fillOpacity: 0.6, weight: 2 }}
    >
      <Popup>
        <div className="bg-white p-2 text-slate-800 flex flex-col items-center">
          <div className="font-bold text-neon-blue mb-1">Your Location</div>
          <div className="text-xs animate-pulse text-accent-pink">Tracking Active</div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

// Removed Static Mock hotspots

const SmartMap = () => {
  const [position, setPosition] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [hotspots, setHotspots] = useState([]);

  const locateUser = () => {
    setTracking(true);
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setTracking(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setTracking(false);
      },
      (err) => {
        setLocationError('Permission denied or location unavailable.');
        setTracking(false);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    // Automatically detect location on load
    locateUser();
  }, []);

  // Fetch hotspots from the Python Backend whenever the position changes
  useEffect(() => {
    const fetchZones = async () => {
      if (position) {
         const data = await getGeospatialHotspots(position[0], position[1]);
         setHotspots(data);
      } else {
         const data = await getGeospatialHotspots(18.5204, 73.8567);
         setHotspots(data);
      }
    };
    fetchZones();
  }, [position]);

  return (
    <div className="w-full h-full flex flex-col gap-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center z-10 relative">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-accent-pink tracking-wider drop-shadow-sm">
          GEOSPATIAL RISK MAP
        </h1>
        <button 
          onClick={locateUser}
          className="cyber-button flex items-center gap-2 relative overflow-hidden group border border-neon-blue/50"
        >
          <Crosshair size={18} className={tracking ? "animate-spin text-white" : "text-white"} />
          {tracking ? "LOCATING TARGET..." : "USE MY LOCATION"}
        </button>
      </motion.div>

      {locationError && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-50 border border-red-200 text-red-500 rounded-lg mb-2 flex items-center gap-2 font-medium shadow-sm">
          <AlertTriangle size={18} /> {locationError}
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2 }}
        className="flex-1 glass-panel overflow-hidden border border-slate-200 relative rounded-2xl bg-white"
      >
        <MapContainer 
          center={[18.5204, 73.8567]} // Default to Pune based on CSV image
          zoom={13} 
          zoomControl={false}
          style={{ width: '100%', height: '100%', borderRadius: '1rem', background: '#f1f5f9' }}
        >
          {/* High resolution Satellite Imagery TileLayer */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri'
          />
          
          <LocationMarker position={position} />

          {hotspots.map(spot => {
            // Determine risk color mapping (Red for Critical, Orange for Medium, Yellow for Low)
            let color = '#EAB308'; // Default Yellow / Low
            if (spot.risk > 60) color = '#F97316'; // Orange / Medium
            if (spot.risk > 85) color = '#EF4444'; // Red / Critical

            return (
              <Circle 
                key={spot.id}
                center={spot.pos}
                radius={spot.radius} // Radius is now rendered in actual physical meters
                pathOptions={{ 
                  color: color, 
                  fillColor: color, 
                  fillOpacity: 0.45,
                  weight: 2
                }}
              >
                <Popup className="cyber-popup">
                  <div style={{ background: '#ffffff', color: '#1e293b', padding: '10px', borderRadius: '8px', border: `2px solid ${color}` }}>
                    <h4 style={{ margin: '0 0 8px 0', color: color, borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>RISK ZONE DETECTED</h4>
                    <p style={{ margin: '4px 0', fontSize: '12px' }}><strong style={{ color: '#64748b' }}>Threat Level:</strong> <span style={{ color: color, fontWeight: 'bold' }}>{spot.risk}%</span></p>
                    <p style={{ margin: '4px 0', fontSize: '12px' }}><strong style={{ color: '#64748b' }}>Severity:</strong> {spot.severity}</p>
                    <p style={{ margin: '4px 0', fontSize: '12px' }}><strong style={{ color: '#64748b' }}>Primary Cause:</strong> {spot.cause}</p>
                  </div>
                </Popup>
              </Circle>
            )
          })}
        </MapContainer>

        {/* Floating AI Panel Light Edition */}
        <div className="absolute top-6 right-6 w-72 glass-panel p-5 border border-slate-200 shadow-xl z-[400] backdrop-blur-xl bg-white/80">
          <div className="flex items-center gap-2 mb-4 text-neon-purple">
            <Navigation size={20} className="animate-pulse" />
            <h3 className="font-bold tracking-widest text-sm">LIVE RADAR</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold">
                <span>Sector Alpha Risk</span>
                <span className="text-accent-pink font-mono">92%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent-pink shadow-[0_0_10px_#FF2E63]" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold">
                <span>Network Stability</span>
                <span className="text-neon-blue font-mono">100%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-neon-blue" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200 mt-3">
              <p className="text-[10px] tracking-widest text-slate-400 font-bold uppercase mb-1">AI Prediction:</p>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">System detects high collision probability ahead. Re-routing recommended via autonomous channels.</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Overrides for leaflet popup default styling to keep the light theme strict */}
      <style>{`
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
          color: #1e293b !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
      `}</style>
    </div>
  );
};

export default SmartMap;
