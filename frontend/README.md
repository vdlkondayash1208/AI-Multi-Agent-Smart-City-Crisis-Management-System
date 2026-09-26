# AI-Powered Disaster Management and Emergency Response System - Frontend

This is the frontend application for the Disaster Management and Emergency Response System. It is built using React, Vite, and Tailwind CSS, featuring role-based dashboards, real-time mapping, and responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Authentication Details (Mock)
The application currently uses a mock authentication system for development. You can log in using the following roles (passwords can be anything):

- **Admin**: `admin@system.local` (Full access to all dashboards)
- **Coordinator**: `coordinator@system.local` (Coordinator and Alert access)
- **Field Responder**: `responder@system.local` (Responder dashboard access)

There is also a public **Citizen Portal** accessible from the login page.

---

## 🛠️ Project Structure

```
frontend/
├── src/
│   ├── components/   # Reusable UI components (Cards, Badges, etc.)
│   ├── context/      # React Contexts (AuthContext, ThemeContext)
│   ├── layouts/      # Main and Auth layouts
│   ├── lib/          # Utilities and Mock Data
│   ├── pages/        # Main application views/pages
│   ├── services/     # API Axios instance and WebSocket service
│   ├── App.jsx       # Routing configuration
│   └── main.jsx      # Entry point
├── .env.example      # Environment variables
├── vite.config.js    # Vite configuration
└── tailwind.config.js# (Using Tailwind v4 directly in index.css)
```

---

## 🔌 Required API Endpoints for Backend Developer

To fully integrate this frontend, the backend needs to expose the following REST endpoints and WebSocket events.

### Authentication
- `POST /api/auth/login` - Authenticate user, return JWT and role.
- `GET /api/auth/me` - Get current user profile.

### Incidents
- `GET /api/incidents` - Get all active incidents.
- `GET /api/incidents/:id` - Get specific incident details.
- `POST /api/incidents` - Create a new incident (from Citizen Portal).
- `PUT /api/incidents/:id` - Update incident status/details.
- `POST /api/incidents/:id/assign` - Assign a unit to an incident.

### Resources & Units
- `GET /api/units` - Get all response units and their statuses/locations.
- `PUT /api/units/:id/status` - Update a unit's status.
- `PUT /api/units/:id/location` - Update a unit's GPS coordinates.

### Alerts
- `POST /api/alerts` - Broadcast a new public alert.
- `GET /api/alerts/public` - Fetch active alerts for the Citizen Portal.

### Analytics
- `GET /api/analytics/summary` - Get historical data for the Reports dashboard.

### WebSocket Events (Real-time)
- `incident_created` - Broadcast when a new incident is reported.
- `incident_updated` - Broadcast when incident status changes.
- `unit_location_updated` - Real-time GPS tracking of units.
- `new_alert` - Push new public alerts to clients instantly.

---

## 🎨 Theme & Styling

The UI is built with a custom design system focusing on professional emergency management aesthetics. 
It supports both Light and Dark modes out-of-the-box, configured via CSS variables in `src/index.css`.
