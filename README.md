# GreenHouseFrontend — Greenhouse Monitoring Dashboard

React single-page application for the
[GreenHouse](https://github.com/DhananjayaSenadheera/GreenHouse) monitoring and automated
irrigation platform. Users register, sign in against the JWT-secured authentication service,
and view greenhouse sensor data from a protected dashboard.

Deployed to **Azure App Service** through a GitHub Actions workflow on every push to `main`.

---

## Features

- **JWT authentication** — login and registration against the GreenHouse authentication API,
  with the token held in browser storage and attached to subsequent requests
- **Protected routing** — `ProtectedPage` guards authenticated routes and redirects to login
  when no valid token is present
- **Client-side token expiry checks** — the JWT `exp` claim is decoded before requests so
  expired sessions are caught without a server round trip
- **Sensor dashboard** — greenhouse readings rendered inside a shared authenticated layout
- **Profile management** — view and update account details

## Screens

| Route | Screen | Access |
|---|---|---|
| `/login` | Sign in | public |
| `/register` | Create account | public |
| `/dashboard` | Sensor dashboard | authenticated |
| `/profile` | View / edit profile | authenticated |

---

## Tech stack

- **React** with functional components and hooks
- **React Router** — declarative routing and route guards
- **Axios** — HTTP client
- **jwt-decode** — client-side token inspection
- Plain CSS modules per component (`src/Styles`)

---

## Project structure

```
greenhouse-manager/src
├── components/       # LoginForm, RegisterForm, Dashboard, Layout, Profile, ProtectedPage
├── pages/            # route-level containers (Login, Register, Dashboard, Profile)
├── services/
│   └── authService.js  # register, login, getProfile, updateProfile, logout, isTokenExpired
├── Styles/           # per-component CSS
└── App.js            # router and route guards
```

All API access is funnelled through `services/authService.js`, so the backend contract lives
in one file rather than being scattered across components.

---

## Running locally

### Prerequisites

- Node.js 22.x
- A running [GreenHouse backend](https://github.com/DhananjayaSenadheera/GreenHouse) — the
  authentication service in particular

### Setup

```bash
git clone https://github.com/DhananjayaSenadheera/GreenHouseFrontend.git
cd GreenHouseFrontend/greenhouse-manager
npm install
npm start
```

The app runs at `http://localhost:3000`.

### Backend URL

`src/services/authService.js` points at the authentication service:

```js
const API_URL = "http://localhost:5039/api/auth";
```

Change this to match your environment, or move it to an environment variable
(`process.env.REACT_APP_API_URL`) before deploying.

---

## Deployment

`.github/workflows/main_monitoringdashboard.yml` builds the app and deploys it to the
**MonitoringDashboard** Azure Web App on every push to `main`. Authentication to Azure uses
OIDC federated credentials — client, tenant and subscription IDs are stored as repository
secrets, so no publish profile or password is committed to the repository.

---

## Project status

Working prototype. Next steps:

- Move the API base URL into environment configuration
- Move JWT storage from `localStorage` to an httpOnly cookie to reduce XSS exposure
- Add charting for sensor history and irrigation events
- Add component tests

---

## Author

**Dhananjaya Senadheera** — Software Engineer (Cloud & .NET)
[LinkedIn](https://www.linkedin.com/in/dhananjaya-senadheera/) · [GitHub](https://github.com/DhananjayaSenadheera)
