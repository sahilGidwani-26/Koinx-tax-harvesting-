# KoinX - Tax Loss Harvesting Tool

A responsive React application for tax loss harvesting, built for the KoinX Frontend Intern Assignment.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Folder Structure

```
src/
├── components/
│   ├── CapitalGainsCards.jsx   # Pre & After Harvesting cards
│   ├── DisclaimerBanner.jsx    # Collapsible disclaimer
│   ├── HoldingsTable.jsx       # Interactive holdings table
│   └── LoadingSkeleton.jsx     # Loading state UI
├── data/
│   └── mockApi.js              # Mock API with simulated async calls
├── hooks/
│   └── useTaxHarvesting.js     # Core business logic hook
├── lib/
│   └── utils.js                # Utility/formatting functions
├── App.jsx                     # Root component
├── index.js                    # Entry point
└── index.css                   # Tailwind base styles
```

## ✅ Features

- **Pre Harvesting Card**: Displays current capital gains (profits, losses, net, realised)
- **After Harvesting Card**: Dynamically updates as user selects holdings
- **Interactive Holdings Table**: Checkbox-driven row selection with real-time updates
- **Select All**: Header checkbox to select/deselect all holdings
- **View All**: Toggle to show all holdings (default shows 5)
- **Responsive**: Works on mobile, tablet, and desktop
- **Loading States**: Skeleton UI while APIs load
- **Error Handling**: Graceful error display

## 🛠 Tech Stack

- React 18 (Hooks, functional components)
- Tailwind CSS
- Lucide React (icons)
- Mock API via JavaScript Promises

## 📝 Assumptions

- All values are in USD
- Mock API simulates a 400-600ms network delay
- Tax calculations treat all gains as applicable (short-term or long-term based on holding data)
- "Amount to Sell" shows total holdings of the selected coin
