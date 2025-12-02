# Library System 📚

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)]()
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)]()
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FF4949)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)]()

This project is a modern library system built with React, TypeScript, and Vite. It provides a user-friendly interface for browsing books, managing user profiles, and handling administrative tasks. The system incorporates features like book borrowing, reservation, fine calculation, and user authentication.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Reference](#api-reference)
7. [Contributing](#contributing)
8. [Important Links](#important-links)
9. [Footer](#footer)

## Features

*   **Book Catalog:** Browse available books by title, author, or category. 🔍
*   **User Authentication:** Secure login and signup for members and admins. 🔐
*   **Book Borrowing/Reservation:** Borrow available books or reserve currently unavailable ones. ⏳
*   **Admin Dashboard:** Manage books, user accounts, and view library statistics. 📊
*   **Fine Calculation:** Automatically calculate fines for overdue books. 💰
*   **User Profile:** View borrowing history and manage account details. 👤
*   **Theme Support:** Toggle between light and dark themes. 🌗
*   **Responsive Layout:** User interface adapts to different screen sizes. 📱

## Tech Stack

*   **Frontend:**
    *   React
    *   TypeScript
    *   Vite
    *   Tailwind CSS
    *   @radix-ui/react-*
    *   react-router-dom
    *   lucide-react
    *   date-fns
    *   tw-animate-css
*   **Other:**
    *   Node.js
    *   eslint

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/mohamedadel-17/library-system.git
    cd library-system
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

3.  **User Perspective:**
    *   Browse the book catalog on the homepage.
    *   Login or signup.
    *   Borrow available books or reserve unavailable ones.
    *   Track borrowed books on the "My Books" page.
    *   Manage profile on the profile page.

4.  **Admin Perspective:**
    *   Log in as an administrator.
    *   Access the admin dashboard at `/admin`.
    *   Manage books using the Books Dashboard.
    *   Manage user accounts on the User Accounts page (`/admin/users`).
    *   View library statistics on the Statistics page (`/admin/stats`).

## Project Structure

```
Library-System/
├── index.html
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── tsconfig.app.json
├── tsconfig.node.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── catalog/
│   │   │   ├── BookCard.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── forms/
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── ui/
│   │   │   ├── *
│   │   ├── Profile/
│   │   │   ├── ProfileContent.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── Actiivity.tsx
│   │   │   └── SectionCard.tsx
│   │   └── admin/
│   │   │   ├── AddBookSheet.tsx
│   │   │   ├── BooksTable.tsx
│   │   │   ├── SideBar.tsx
│   │   │   ├── UserList.tsx
│   │   │   └── UserListItem.tsx
│   ├── pages/
│   │   ├── CatalogPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignUp.tsx
│   │   ├── Profile.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── UserBooksPage.tsx
│   │   ├── UserAccounts.tsx
│   │   └── StatisticsPage.tsx
│   ├── data/
│   │   ├── books.ts
│   │   ├── mockUsers.ts
│   │   └── statistics.ts
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── lib/
│   │   └── utils.ts
│   └── assets/
│       ├── Logo.png
│       ├── signupphoto.png
│       └── user-svgrepo-com.png
├── components.json
```

## API Reference

This project mainly focuses on the frontend implementation. There are no explicit backend APIs defined in the provided code. However, the `src/components/forms/login-form.tsx` and `src/components/forms/signup-form.tsx` files indicate placeholders for API calls that could be integrated for user authentication.

## Contributing

Contributions are always welcome!

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes.
4.  Push to the branch.
5.  Submit a pull request.


## Important Links

*   **Users' Profiles:** [https://github.com/mohamedadel-17](https://github.com/mohamedadel-17) , [https://github.com/tAwFiK2005](https://github.com/tAwFiK2005) 
*   **Project Repository:** [https://github.com/mohamedadel-17/library-system](https://github.com/mohamedadel-17/library-system)

## Footer

[Library System](https://github.com/mohamedadel-17/library-system) - A project by [Mohamed Adel](https://github.com/mohamedadel-17) & [Ahmed Tawfik](https://github.com/tAwFiK2005) . Feel free to fork, like, and star the repository! If you have any issues or suggestions, please open an issue. 🚀


---
