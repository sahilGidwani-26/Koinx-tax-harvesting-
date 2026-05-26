import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "../lib/utils";

const portfolioSummary = {
  totalValue: 82420.68,
  change24h: 1243.5,
  changePct: 1.53,
  invested: 74800,
  pnl: 7620.68,
  pnlPct: 10.19,
};

const topAssets = [
  {
    coin: "Bitcoin",
    symbol: "BTC",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    value: 55320.15,
    change: 2.4,
    holdings: "0.638 BTC",
  },
  {
    coin: "Ethereum",
    symbol: "ETH",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    value: 9324.21,
    change: -1.2,
    holdings: "5.67 ETH",
  },
  {
    coin: "Solana",
    symbol: "SOL",
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    value: 7856.4,
    change: 5.8,
    holdings: "52.9 SOL",
  },
  {
    coin: "Polygon",
    symbol: "MATIC",
    logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    value: 4672.12,
    change: -0.7,
    holdings: "2210 MATIC",
  },
];

const recentTxns = [
  { type: "buy", coin: "Bitcoin", symbol: "BTC", amount: 0.05, value: 4341, date: "Today, 09:14 AM" },
  { type: "sell", coin: "Ethereum", symbol: "ETH", amount: 1.2, value: 1971, date: "Yesterday, 3:40 PM" },
  { type: "buy", coin: "Solana", symbol: "SOL", amount: 10, value: 1485, date: "24 May, 11:00 AM" },
  { type: "sell", coin: "Tether", symbol: "USDT", amount: 500, value: 499, date: "23 May, 6:22 PM" },
];

function StatCard({ label, value, sub, subGood }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && (
        <p className={`text-sm mt-1 font-medium ${subGood ? "text-green-600" : "text-red-500"}`}>{sub}</p>
      )}
    </div>
  );
}

function CoinLogo({ logo, name }) {
  return (
    <img
      src={logo}
      alt={name}
      className="w-8 h-8 rounded-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://ui-avatars.com/api/?name=${name}&background=1A56DB&color=fff&size=32`;
      }}
    />
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome back 👋</h2>
          <p className="text-sm text-gray-500 mt-0.5">Here's your crypto overview</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Portfolio Value"
          value={formatCurrency(portfolioSummary.totalValue)}
          sub={`+${formatCurrency(portfolioSummary.change24h)} today`}
          subGood={true}
        />
        <StatCard
          label="Total Invested"
          value={formatCurrency(portfolioSummary.invested)}
        />
        <StatCard
          label="Total P&L"
          value={formatCurrency(portfolioSummary.pnl)}
          sub={`+${portfolioSummary.pnlPct}% all time`}
          subGood={true}
        />
        <StatCard
          label="24h Change"
          value={`+${portfolioSummary.changePct}%`}
          sub="↑ vs yesterday"
          subGood={true}
        />
      </div>

      {/* Top Assets + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 w-full">
        {/* Top Assets */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Top Assets</h3>
            <Wallet size={16} className="text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {topAssets.map((asset) => (
              <div key={asset.symbol} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <CoinLogo logo={asset.logo} name={asset.symbol} />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{asset.coin}</p>
                    <p className="text-xs text-gray-400">{asset.holdings}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">{formatCurrency(asset.value)}</p>
                  <p className={`text-xs font-medium flex items-center justify-end gap-0.5 ${asset.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {asset.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(asset.change)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <Clock size={16} className="text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {recentTxns.map((tx, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === "buy" ? "bg-green-100" : "bg-red-100"}`}>
                    {tx.type === "buy"
                      ? <TrendingUp size={15} className="text-green-600" />
                      : <TrendingDown size={15} className="text-red-500" />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 capitalize">
                      {tx.type} {tx.coin}
                    </p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${tx.type === "buy" ? "text-green-600" : "text-red-500"}`}>
                    {tx.type === "buy" ? "+" : "-"}{formatCurrency(tx.value)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {tx.amount} {tx.symbol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-1">Tax Season is coming!</h3>
        <p className="text-blue-100 text-sm mb-4">
          You could save up to <span className="font-bold text-white">$862</span> with Tax Loss Harvesting.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "tax" }))}
            className="bg-white text-blue-700 text-sm font-bold px-5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start Tax Harvesting →
          </button>
          <button className="border border-blue-400 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-500/50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}