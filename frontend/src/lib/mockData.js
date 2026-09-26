export const MOCK_INCIDENTS = [
  {
    id: 'INC-001',
    type: 'Fire',
    severity: 'critical',
    status: 'active',
    location: { lat: 34.0522, lng: -118.2437, address: 'Downtown LA' },
    description: 'Large structural fire in commercial building.',
    reportedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    assignedUnits: ['U-101', 'U-102']
  },
  {
    id: 'INC-002',
    type: 'Flood',
    severity: 'high',
    status: 'active',
    location: { lat: 34.0736, lng: -118.4004, address: 'Beverly Hills' },
    description: 'Flash flooding reported in residential area.',
    reportedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    assignedUnits: ['U-205']
  },
  {
    id: 'INC-003',
    type: 'Medical',
    severity: 'medium',
    status: 'resolved',
    location: { lat: 34.0194, lng: -118.4108, address: 'Santa Monica' },
    description: 'Multiple injuries reported due to collapsed structure.',
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    assignedUnits: ['U-301']
  }
];

export const MOCK_UNITS = [
  { id: 'U-101', type: 'Fire Engine', status: 'busy', location: { lat: 34.053, lng: -118.245 } },
  { id: 'U-102', type: 'Ladder Truck', status: 'busy', location: { lat: 34.051, lng: -118.242 } },
  { id: 'U-205', type: 'Rescue Boat', status: 'busy', location: { lat: 34.074, lng: -118.401 } },
  { id: 'U-301', type: 'Ambulance', status: 'available', location: { lat: 34.015, lng: -118.415 } },
  { id: 'U-402', type: 'Hazmat', status: 'available', location: { lat: 34.060, lng: -118.300 } }
];

export const MOCK_STATS = [
  { name: 'Jan', fire: 400, flood: 240, medical: 2400 },
  { name: 'Feb', fire: 300, flood: 139, medical: 2210 },
  { name: 'Mar', fire: 200, flood: 980, medical: 2290 },
  { name: 'Apr', fire: 278, flood: 390, medical: 2000 },
  { name: 'May', fire: 189, flood: 480, medical: 2181 },
  { name: 'Jun', fire: 239, flood: 380, medical: 2500 },
  { name: 'Jul', fire: 349, flood: 430, medical: 2100 },
];
