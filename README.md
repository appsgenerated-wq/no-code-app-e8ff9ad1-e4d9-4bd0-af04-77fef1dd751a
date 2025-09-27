# FoodFinder - A Manifest-powered Food Review App

This is a full-stack food review application built entirely on the Manifest platform. It allows users to sign up, log in, view a list of restaurants, and post their own reviews.

## Features

- **User Authentication**: Secure sign-up and login for users, powered by Manifest's `authenticable` feature.
- **Restaurant Listings**: View a list of restaurants with details like cuisine and description.
- **User Reviews**: Logged-in users can post ratings and comments for any restaurant.
- **Role-Based Permissions**: Access control is managed by Manifest policies, distinguishing between regular diners and admins.
- **Dynamic Frontend**: A responsive React frontend built with Vite and styled with Tailwind CSS.
- **Manifest SDK Integration**: All backend communication is handled seamlessly through the `@mnfst/sdk`.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file in the root of your project and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.com
    VITE_APP_ID=your-app-id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Admin Panel

Access the auto-generated admin panel at `https://your-manifest-backend-url.com/admin`.

- **Default Admin:** `admin@manifest.build`
- **Default Password:** `admin`

You can use the admin panel to manage users, add restaurants, and moderate reviews.