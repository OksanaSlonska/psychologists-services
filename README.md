# 🧠 Psychologists Services

A modern web application for finding and booking appointments with professional psychologists. The platform allows users to browse psychologist profiles, filter them by various criteria, read reviews, and manage a personal list of favorites.

![Project Preview](public/preview.PNG)

## ✨ Features

- **Home Page**: Welcoming hero section with project description.
- **Psychologists Catalog**:
  - Fetching data from **Firebase Realtime Database**.
  - **Pagination** (Load More button) for smooth user experience.
  - **Filtering** by price, alphabet, and popularity.
- **Psychologist Card**:
  - Detailed information (experience, license, specialization).
  - **"Read More"** functionality to expand/collapse reviews.
  - Interactive **Favorites** button (add/remove from saved list).
- **Authentication**:
  - Secure Registration and Login using **Firebase Auth**.
  - Modal windows for seamless UX.
  - Form validation with error handling.
- **Appointment Booking**:
  - Modal form to book a visit.
  - Validation for name, phone, email, and time.
- **Favorites Page**: View only saved psychologists (private route).
- **Responsive Design**: Fully adapted for Mobile, Tablet, and Desktop devices (Mobile First approach).

## 🛠 Tech Stack

**Core:**

- [React](https://reactjs.org/) (v18)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

**State Management:**

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist) (for saving favorites/auth state)

**Routing & API:**

- [React Router DOM](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/) (Auth, Database)

**Styling & UI:**

- CSS Modules
- [React Spinners](https://www.npmjs.com/package/react-spinners) (Loading states)
- [React Hot Toast](https://react-hot-toast.com/) (Notifications)

**Forms & Validation:**

- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup) (Schema validation)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/OksanaSlonska/psychologists-services.git
   ```
