import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MapPin, Clock, AlertCircle, ChevronRight, Check } from 'lucide-react';
import { MOCK_INCIDENTS, MOCK_UNITS } from '../lib/mockData';

export default function CoordinatorDashboard() {
  const [selectedIncident, setSelectedIncident] = useState(MOCK_INCIDENTS[0]);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500">
      {/* Incident List */}
      <Card className="w-1/3 flex flex-col overflow-hidden">
        <CardHeader className="bg-secondary/50 border-b border-border pb-4">
          <CardTitle>Active Incidents</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">{MOCK_INCIDENTS.length} requiring attention</div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          <div className="divide-y divide-border">
            {MOCK_INCIDENTS.map((incident) => (
              <div 
                key={incident.id} 
                onClick={() => setSelectedIncident(incident)}
                className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${selectedIncident?.id === incident.id ? 'bg-secondary border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{incident.type}</h4>
                  <Badge variant={getSeverityColor(incident.severity)} className="capitalize">
                    {incident.severity}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3 mr-1" /> {incident.location.address}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" /> {new Date(incident.reportedAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incident Details & Assignment */}
      <Card className="w-2/3 flex flex-col overflow-hidden">
        {selectedIncident ? (
          <>
            <CardHeader className="border-b border-border bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl">{selectedIncident.type}</CardTitle>
                    <Badge variant={getSeverityColor(selectedIncident.severity)} className="capitalize text-sm">
                      {selectedIncident.severity}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {selectedIncident.location.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                  <Badge variant={selectedIncident.status === 'active' ? 'destructive' : 'success'} className="capitalize">
                    {selectedIncident.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-6">
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-foreground/80 leading-relaxed p-4 bg-secondary/30 rounded-xl border border-border">
                  {selectedIncident.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Assigned Units</h3>
                  {selectedIncident.assignedUnits.length > 0 ? (
                    <div className="space-y-3">
                      {selectedIncident.assignedUnits.map(unitId => {
                        const unit = MOCK_UNITS.find(u => u.id === unitId);
                        return (
                          <div key={unitId} className="flex items-center p-3 bg-secondary rounded-lg border border-border">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                            <div className="flex-1">
                              <div className="font-medium">{unit?.type || unitId}</div>
                              <div className="text-xs text-muted-foreground">{unit?.id}</div>
                            </div>
                            <Badge variant="success">En Route</Badge>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-muted-foreground italic">No units assigned.</div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Units</h3>
                  <div className="space-y-3">
                    {MOCK_UNITS.filter(u => u.status === 'available').map(unit => (
                      <div key={unit.id} className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg border border-border transition-colors">
                        <div>
                          <div className="font-medium">{unit.type}</div>
                          <div className="text-xs text-muted-foreground">{unit.id} • 2.4 mi away</div>
                        </div>
                        <button className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Recommendations Placeholder */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  <AlertCircle className="h-5 w-5 mr-2" /> AI Priority Recommendation
                </div>
                <p className="text-sm text-foreground/80 mb-3">Based on current traffic and severity, dispatching Hazmat (U-402) is highly recommended. Expected arrival in 8 mins.</p>
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                  Apply AI Recommendation <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

            </CardContent>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select an incident to view details
          </div>
        )}
      </Card>
    </div>
  );
}
