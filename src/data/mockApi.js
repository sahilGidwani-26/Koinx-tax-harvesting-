// Mock Holdings API Response
export const holdingsData = [
  {
    coin: "Bitcoin",
    coinName: "BTC",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    totalHoldings: 0.63776,
    averageBuyPrice: 65320.15,
    currentPrice: 86800,
    stcg: { gain: -1200, balance: 0.338 },
    ltcg: { gain: 2400, balance: 0.3 },
  },
  {
    coin: "Ethereum",
    coinName: "ETH",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    totalHoldings: 5.6736,
    averageBuyPrice: 1620.15,
    currentPrice: 1643.2,
    stcg: { gain: 55320.15, balance: 2.332 },
    ltcg: { gain: 8239.29, balance: 3.245 },
  },
  {
    coin: "Tether",
    coinName: "USDT",
    logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    totalHoldings: 3096.54,
    averageBuyPrice: 1.15,
    currentPrice: 1.01,
    stcg: { gain: -1200, balance: 2011.23 },
    ltcg: { gain: 2400, balance: 802.47 },
  },
  {
    coin: "Polygon",
    coinName: "MATIC",
    logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    totalHoldings: 2210,
    averageBuyPrice: 2.31,
    currentPrice: 2.11,
    stcg: { gain: -1200, balance: 802 },
    ltcg: { gain: 2400, balance: 1402 },
  },
  {
    coin: "Solana",
    coinName: "SOL",
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    totalHoldings: 12.5,
    averageBuyPrice: 95.2,
    currentPrice: 148.5,
    stcg: { gain: 320.5, balance: 5.2 },
    ltcg: { gain: 4150.0, balance: 7.3 },
  },
  {
    coin: "Cardano",
    coinName: "ADA",
    logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    totalHoldings: 5000,
    averageBuyPrice: 0.48,
    currentPrice: 0.38,
    stcg: { gain: -300, balance: 1200 },
    ltcg: { gain: -200, balance: 800 },
  },
];

// Mock Capital Gains API Response
export const capitalGainsData = {
  stcg: {
    profits: 1540,
    losses: -743,
  },
  ltcg: {
    profits: 1200,
    losses: -650,
  },
};

// Mock API functions (simulating async calls)
export const fetchHoldings = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(holdingsData), 600);
  });

export const fetchCapitalGains = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(capitalGainsData), 400);
  });
