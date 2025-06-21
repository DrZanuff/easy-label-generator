# Easy Label Generator

Easy Label Generator is a simple Next.js web application designed to create and purchase shipping labels using the EasyPost API. The user can input sender and recipient addresses, define the parcel dimensions, and generate a shipping label ready for printing or download.

## Features

- Address form with validation using Yup (client) and Zod (server)
- Parcel information form with validation
- Integration with EasyPost API for address verification, shipment creation, and label purchase
- Multi-step user flow managed via a MUI Stepper and global state using Jotai
- Display of the generated shipping label with options to:

  - Download the label
  - Print the label directly
  - Start a new shipment

- Skeleton placeholder while the shipping label is loading
- Responsive and accessible UI using Material UI components

## Technologies Used

- **Next.js (v15)** — React framework for SSR and SSG
- **React (v18)**
- **TypeScript**
- **Material UI (v7)** — for the component library and styling
- **Jotai (v2)** — global state management
- **React Hook Form (v7)** — form handling
- **Yup** — form validation (client side)
- **Zod** — schema validation (server side)
- **React Hot Toast** — toast notifications
- **EasyPost Node.js SDK** — API integration

## API

This project integrates with the [EasyPost API](https://docs.easypost.com/guides/getting-started?lang=javascript) to:

- Validate shipping addresses
- Create shipments with provided address and parcel data
- Purchase the shipment
- Retrieve the generated shipping label (PNG)

## Project Structure

```
src/
├── components/      // UI components (forms, steppers, label preview, etc.)
├── atoms/          // Jotai global state atoms
├── schemas/        // Yup (client) and Zod (server) validation schemas
├── helpers/        // Utility functions
├── types/          // TypeScript types
├── pages/api/      // Next.js API routes (address validation, shipment creation & buy)
└── app/            // Main app entry point
```

## Configuration

To run this project locally, you need to provide your **EasyPost Secret API Key**.

1. Copy the `.env.example` file and rename it to `.env.local`:

```
cp .env.example .env.local
```

2. Update the environment variable in `.env.local`:

```
EASYPOST_SECRET_API_KEY=your_secret_key_here
```

You can get your EasyPost API key from your [EasyPost Dashboard](https://www.easypost.com/account/api-keys).

## Running the Project

1. Install dependencies:

```
npm install
```

2. Run the development server:

```
npm run dev
```

3. Open your browser and go to:

```
http://localhost:3000
```

## Technical Decisions

- **Next.js App Router** is used for modern server-side capabilities and API routes.
- **React Hook Form** simplifies form state and validation handling on the client.
- **Jotai** is used for lightweight global state to control the current step and store the label URL.
- **EasyPost API SDK** manages shipping logistics, removing the need to manually handle carrier integrations.
- **Server-side Zod validation** ensures payload safety before interacting with the EasyPost API.
- **Client-side Yup validation** offers immediate form feedback for a better user experience.
- The shipping label is not stored in the application but retrieved directly via URL after the shipment is bought.

## Demo Video

A demo video of the application in action is available here:

https://github.com/user-attachments/assets/c15794fe-0795-413f-9bb9-913579a293f7


