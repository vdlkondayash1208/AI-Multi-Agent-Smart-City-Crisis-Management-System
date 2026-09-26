import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MapPin, Navigation2, CheckCircle2, AlertTriangle, MessageSquare, WifiOff } from 'lucide-react';
import { MOCK_INCIDENTS } from '../lib/mockData';

export default function ResponderDashboard() {
  // Mock assigned incident
  const incident = MOCK_INCIDENTS[0];
  const [status, setStatus] = useState('en-route');
  
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Offline Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-4 py-3 rounded-xl flex items-center text-sm font-medium">
        <WifiOff className="h-4 w-4 mr-2" />
        Offline Mode Active. Data cached locally. Updates will sync when connection restores.
      </div>

      <Card className="border-primary/50 shadow-md shadow-primary/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <CardHeader className="bg-card pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-bold tracking-wider text-primary mb-1 uppercase">Current Assignment</div>
              <CardTitle className="text-2xl mb-2">{incident.type}</CardTitle>
            </div>
            <Badge variant="destructive" className="capitalize text-sm px-3 py-1 shadow-sm">
              {incident.severity} Priority
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center mt-2">
            <MapPin className="h-5 w-5 mr-2 text-primary" /> 
            <span className="font-medium text-foreground">{incident.location.address}</span>
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="bg-secondary/50 rounded-xl p-4 mb-6 border border-border">
            <h4 className="font-semibold mb-2 flex items-center"><AlertTriangle className="h-4 w-4 mr-2 text-warning" /> Emergency Details</h4>
            <p className="text-foreground/80">{incident.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <button 
              onClick={() => setStatus('en-route')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${status === 'en-route' ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-105' : 'bg-card border-border hover:bg-secondary text-muted-foreground'}`}
            >
              <Navigation2 className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">En Route</span>
            </button>
            <button 
              onClick={() => setStatus('on-scene')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${status === 'on-scene' ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30 scale-105' : 'bg-card border-border hover:bg-secondary text-muted-foreground'}`}
            >
              <MapPin className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">On Scene</span>
            </button>
            <button 
              onClick={() => setStatus('resolved')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${status === 'resolved' ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/30 scale-105' : 'bg-card border-border hover:bg-secondary text-muted-foreground'}`}
            >
              <CheckCircle2 className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Resolved</span>
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Action Items</h4>
            <label className="flex items-start p-4 rounded-xl border border-border hover:bg-secondary/50 cursor-pointer transition-colors group">
              <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary bg-background" />
              <span className="ml-3">
                <span className="block font-medium group-hover:text-primary transition-colors">Secure the perimeter</span>
                <span className="block text-sm text-muted-foreground mt-1">Ensure civilians are evacuated from immediate danger zone.</span>
              </span>
            </label>
            <label className="flex items-start p-4 rounded-xl border border-border hover:bg-secondary/50 cursor-pointer transition-colors group">
              <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary bg-background" />
              <span className="ml-3">
                <span className="block font-medium group-hover:text-primary transition-colors">Assess structural integrity</span>
                <span className="block text-sm text-muted-foreground mt-1">Check for potential collapse risks before entering.</span>
              </span>
            </label>
          </div>

        </CardContent>
      </Card>
      
      {/* Comms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><MessageSquare className="h-5 w-5 mr-2" /> Command Center Comms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/30 rounded-xl p-4 h-48 overflow-y-auto mb-4 border border-border space-y-3">
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-primary mb-1">Command</span>
              <div className="bg-card border border-border px-3 py-2 rounded-lg text-sm rounded-tl-none">U-101, be advised heavy traffic on 4th st. Use alternative route.</div>
            </div>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Update command..." className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90">Send</button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
