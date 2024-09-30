# Innova Chain Frontend

Innova Chain Frontend is a React-based web application for discovering and creating digital art on the blockchain.

## Features

- Discover and explore digital artworks
- Create and upload your own artworks
- Connect with Solana wallet
- Responsive design for various screen sizes

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Solana Web3.js
- React Router

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/innova-chain-frontend.git
   cd innova-chain-frontend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables:
   ```
   VITE_INNOVA_CHAIN_ENV=devnet
   VITE_DISABLED_POLYFILLS=false
   ```

### Development

To run the development server:

```
pnpm dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```
pnpm build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/`: Source code
  - `assets/`: Images and SVGs
  - `components/`: Reusable React components
  - `pages/`: Main page components
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions
  - `context/`: React context providers
- `public/`: Public assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
