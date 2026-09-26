import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { BellRing, Map, Send, Smartphone, AlertTriangle } from 'lucide-react';

export default function AlertComposer() {
  const [severity, setSeverity] = useState('advisory');
  const [message, setMessage] = useState('');
  
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* Composer Form */}
      <Card className="flex-1">
        <CardHeader className="border-b border-border bg-card">
          <CardTitle className="flex items-center text-xl">
            <BellRing className="h-5 w-5 mr-2 text-primary" /> Create Public Alert
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          
          <div className="space-y-3">
            <label className="text-sm font-semibold">Alert Severity</label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${severity === 'advisory' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-600 dark:text-yellow-400' : 'bg-card border-border hover:bg-secondary'}`}>
                <input type="radio" name="severity" className="sr-only" checked={severity === 'advisory'} onChange={() => setSeverity('advisory')} />
                <span className="font-medium">Advisory</span>
              </label>
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${severity === 'warning' ? 'bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400' : 'bg-card border-border hover:bg-secondary'}`}>
                <input type="radio" name="severity" className="sr-only" checked={severity === 'warning'} onChange={() => setSeverity('warning')} />
                <span className="font-medium">Warning</span>
              </label>
              <label className={`flex-1 flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${severity === 'emergency' ? 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 shadow-md shadow-red-500/20' : 'bg-card border-border hover:bg-secondary'}`}>
                <input type="radio" name="severity" className="sr-only" checked={severity === 'emergency'} onChange={() => setSeverity('emergency')} />
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="font-medium">Emergency</span>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center justify-between">
              Target Area
              <button className="text-xs text-primary hover:underline flex items-center"><Map className="h-3 w-3 mr-1"/> Draw on Map</button>
            </label>
            <select className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none">
              <option>All Zones</option>
              <option>Downtown Sector (Zone A)</option>
              <option>Coastal Region (Zone B)</option>
              <option>Northern Suburbs (Zone C)</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold">Message Content</label>
            <textarea 
              rows="4" 
              placeholder="Enter the alert message to be broadcasted..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none resize-none"
            ></textarea>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Variables: {"{LOCATION}"}, {"{TIME}"}, {"{INSTRUCTIONS}"}</span>
              <span>{message.length} / 160 characters (SMS limit)</span>
            </div>
          </div>

          <button className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex justify-center items-center">
            <Send className="h-5 w-5 mr-2" /> Broadcast Alert Now
          </button>

        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="w-full lg:w-80 bg-slate-900 border-slate-800 text-slate-100 hidden md:flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        <CardHeader className="pb-2 border-b border-slate-800">
          <CardTitle className="text-sm flex items-center text-slate-400 font-normal">
            <Smartphone className="h-4 w-4 mr-2" /> Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-6 flex items-center justify-center">
          
          {/* Phone Mockup */}
          <div className="w-64 h-[500px] border-[6px] border-slate-800 rounded-[3rem] bg-black p-2 relative shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl w-32 mx-auto z-10"></div>
            <div className="w-full h-full bg-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col relative">
              <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544002621-bc74df3b8d4e?auto=format&fit=crop&q=80&w=300")'}}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center p-4">
                  
                  {/* Alert Bubble */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${severity === 'emergency' ? 'bg-red-500' : severity === 'warning' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                        <AlertTriangle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 uppercase">Emergency Alert</span>
                    </div>
                    <p className="text-sm text-slate-800 font-medium leading-snug">
                      {message || "This is a preview of the emergency alert message that citizens will receive on their mobile devices."}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 py-1.5 bg-slate-200 rounded-lg text-xs font-bold text-slate-700">Dismiss</button>
                      <button className="flex-1 py-1.5 bg-blue-600 rounded-lg text-xs font-bold text-white">More Info</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
