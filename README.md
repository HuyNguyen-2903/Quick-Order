# Quick-Order

A pharmacy quick order mobile application built with React Native, Expo, and Redux Toolkit.

## Features

- 📦 Product list with lazy loading
- 🔍 Search and filter products by name and category
- 🛒 Quick order cart with quantity management
- 💊 Prescription product highlighting
- 📊 Order summary with totals
- 🎨 Modern UI with SafeArea support

## Tech Stack

- **React Native** with **Expo Router**
- **Redux Toolkit** for state management
- **TypeScript** for type safety
- **React Native Safe Area Context** for proper screen boundaries

## Project Structure

```
app/
  ├── _layout.tsx          # Root layout with Redux Provider
  ├── index.tsx            # Root route (/)
  └── products/
      ├── index.tsx        # Products screen
      └── index.styles.ts  # Products styles

components/
  ├── ProductItem.tsx
  ├── ProductItem.styles.ts
  ├── QuickOrderSummary.tsx
  └── QuickOrderSummary.styles.ts

store/
  ├── index.ts             # Redux store
  ├── hooks.ts             # Typed hooks
  ├── types.ts             # TypeScript types
  └── slices/
      ├── productsSlice.ts
      └── cartSlice.ts
```

## Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on your preferred platform:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Usage

1. View the product list
2. Search products by name
3. Filter by category (All, Pain Relief, Antibiotic, Supplement, Allergy)
4. Add/remove products using +/- buttons or direct quantity input
5. View order summary at the bottom

## Requirements

- Quantity limit: 0-99 units per product
- Prescription products are marked with "Rx" badge
- Vietnamese currency (VND) formatting

## License

MIT
