# 🧾 Frontend – Smart Appointment Scheduling System

## 🚀 Overview

This is the frontend for the **Smart Appointment Scheduling System**, built with a focus on **clean UI, maintainable structure, and real-world API integration patterns**.

The application allows users to:

* Register and login
* View available appointment slots
* Book appointments
* View their bookings
* Cancel appointments

---

## 🛠️ Tech Stack

* **React (Vite + TypeScript)**
* **Tailwind CSS**
* **shadcn/ui**
* **TanStack Query (React Query)**
* **Framer Motion (minimal usage)**
* **Axios (API layer)**

---

## 📁 Project Structure

```bash
src/
  api/              # API layer (axios calls)
  hooks/            # React Query hooks (useLogin, etc.)
  components/       # Reusable UI components
  pages/            # Page-level components
  types/            # TypeScript types
  lib/              # Axios instance, utilities
  App.tsx
  main.tsx
```

---

## ⚙️ Features Implemented

### 🔐 Authentication

* Login and Register UI
* JWT-based authentication integration
* Token stored in localStorage
* Protected routes (basic handling)

---

### 📅 Slot Management

* View available slots
* Visual status (Available / Booked)
* Clean and responsive UI

---

### 📌 Appointment Management

* Book appointment
* View "My Appointments"
* Cancel appointment

---

### ⚡ State Management

* Used **TanStack Query** for:

  * API calls
  * Mutations (login, booking)
  * Caching and async state handling

---

## 🧠 Key Design Decisions

* **Separation of concerns**

  * API layer → hooks → UI
* **Mutation-based auth flow**

  * Login handled via `useMutation`
* **Reusable hooks**

  * Clean and scalable approach
* **Minimal animations**

  * Focus on usability over visual noise

---

## 🧪 Error & Loading Handling

* Proper loading states on actions (login, booking)
* Error messages displayed to users
* Disabled buttons during API calls

---

## ⚠️ Limitations / Tradeoffs

Due to time constraints and scope of the assignment, the following were intentionally kept minimal or not implemented:

* ❌ No refresh token mechanism (only basic JWT handling)
* ❌ No persistent auth session management (beyond localStorage)
* ❌ Limited form validation UX
* ❌ No role-based UI (e.g., admin panel)
* ❌ No pagination or filtering for slots

---

## 🚧 Improvements (If Extended)

Given more time, I would improve:

* 🔄 Refresh token implementation for better auth security
* 🌐 Better session handling and auto-login
* ⚡ Optimistic UI updates (especially for booking/cancel)
* 📊 Pagination & filtering for slots
* 🧪 Unit and integration tests
* 🎯 Improved UX for validation and error states
* 🧑‍💼 Admin UI for slot management

---

## 🌍 Deployment Note

Due to time constraints and parallel work commitments:

* The frontend is **not deployed on a VPS or hosting platform**
* The focus was kept on **correct functionality, architecture, and API integration**

---

## ▶️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Create a `.env` file at the project root (Vite reads env variables prefixed with `VITE_`) and set the backend base url. Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:4000/api/v1
```

This project expects the backend API to provide these endpoints (implemented against `VITE_API_BASE_URL`):

- `POST /auth/register` — payload: `{ name, email, password }`.
  - Example success response:
    ```json
    {
      "success": true,
      "statusCode": 201,
      "message": "User registered successfully",
      "data": { "id": "...", "email": "...", "name": "..." }
    }
    ```
- `POST /auth/login` — payload: `{ email, password }` -> returns `{ token, user }` used for auth persistence.
- `GET /slots?date=YYYY-MM-DD` — returns available slots for a date.
- `POST /appointments` — book a slot. Body contains `slotId`.
- `GET /appointments` — returns appointments for the logged in user (token required).
- `DELETE /appointments/:slotId` — cancel appointment by `slotId` (returns message). Example success response:
  ```json
  { "success": true, "statusCode": 200, "message": "Appointment cancelled", "data": [] }
  ```

Notes about auth and requests:

- Axios instance reads `localStorage.getItem('token')` and sets `Authorization: Bearer <token>` automatically via an interceptor in `src/lib/axios.ts`.
- Make sure to login after registering to set the token in `localStorage` or the app won't be able to fetch protected endpoints.

Quick curl examples (replace base url and token where needed):

Register:
```bash
curl -X POST "$VITE_API_BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"Saurabh","email":"saurabh@example.com","password":"12345"}'
```

Login:
```bash
curl -X POST "$VITE_API_BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"saurabh@example.com","password":"12345"}'
```

Get appointments (requires token):
```bash
curl -H "Authorization: Bearer <TOKEN>" "$VITE_API_BASE_URL/appointments"
```

Cancel appointment (requires token):
```bash
curl -X DELETE -H "Authorization: Bearer <TOKEN>" "$VITE_API_BASE_URL/appointments/<SLOT_ID>"
```

---

## 🔗 Backend Dependency

This frontend depends on the backend API.
Make sure backend server is running before using the app.

---

## 🎯 Final Notes

This project prioritizes:

* Clean architecture
* Correct data flow
* Real-world integration patterns
* Maintainability over quick hacks

---

If you have any questions or would like a walkthrough, I’d be happy to explain the implementation in detail.

---
