import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { formatCurrency, formatNumber } from "../lib/utils";

const allHoldings = [
  {
    coin: "Bitcoin", symbol: "BTC",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    holdings: 0.63776, avgBuy: 65320.15, currentPrice: 86800,
    value: 55320.15, pnl: 13724.2, pnlPct: 24.8, change24h: 2.4,
    color: "#F7931A",
  },
  {
    coin: "Ethereum", symbol: "ETH",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    holdings: 5.6736, avgBuy: 1620.15, currentPrice: 1643.2,
    value: 9324.21, pnl: 130.6, pnlPct: 1.4, change24h: -1.2,
    color: "#627EEA",
  },
  {
    coin: "Solana", symbol: "SOL",
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    holdings: 52.9, avgBuy: 110.2, currentPrice: 148.5,
    value: 7856.4, pnl: 2024.6, pnlPct: 34.8, change24h: 5.8,
    color: "#9945FF",
  },
  {
    coin: "Tether", symbol: "USDT",
    logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    holdings: 3096.54, avgBuy: 1.15, currentPrice: 1.01,
    value: 3142.21, pnl: -433.5, pnlPct: -12.1, change24h: -0.02,
    color: "#26A17B",
  },
  {
    coin: "Polygon", symbol: "MATIC",
    logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    holdings: 2210, avgBuy: 2.31, currentPrice: 2.11,
    value: 4672.12, pnl: -442.0, pnlPct: -8.6, change24h: -0.7,
    color: "#8247E5",
  },
  {
    coin: "Cardano", symbol: "ADA",
    logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    holdings: 5000, avgBuy: 0.48, currentPrice: 0.38,
    value: 1900.0, pnl: -500.0, pnlPct: -20.8, change24h: -1.4,
    color: "#0033AD",
  },
];

const totalValue = allHoldings.reduce((s, h) => s + h.value, 0);

const pieData = allHoldings.map((h) => ({
  name: h.symbol,
  value: parseFloat(((h.value / totalValue) * 100).toFixed(1)),
  fill: h.color,
}));

function CoinLogo({ logo, name }) {
  return (
    <img
      src={logo} alt={name}
      className="w-8 h-8 rounded-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://ui-avatars.com/api/?name=${name}&background=1A56DB&color=fff&size=32`;
      }}
    />
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg text-sm">
        <p className="font-bold text-gray-900">{payload[0].name}</p>
        <p className="text-gray-500">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function Portfolio() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("value");

  const filtered = allHoldings
    .filter(
      (h) =>
        h.coin.toLowerCase().includes(search.toLowerCase()) ||
        h.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "value") return b.value - a.value;
      if (sortBy === "pnl") return b.pnl - a.pnl;
      if (sortBy === "change") return b.change24h - a.change24h;
      return 0;
    });

  const totalPnl = allHoldings.reduce((s, h) => s + h.pnl, 0);
  const totalInvested = allHoldings.reduce((s, h) => s + h.holdings * h.avgBuy, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
        <p className="text-sm text-gray-500 mt-0.5">Your complete holdings overview</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Portfolio Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
        </div>
        <div className={`rounded-2xl border p-5 col-span-2 md:col-span-1 ${totalPnl >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <p className={`text-xs uppercase tracking-wide font-medium mb-1 ${totalPnl >= 0 ? "text-green-600" : "text-red-500"}`}>
            Overall P&amp;L
          </p>
          <p className={`text-2xl font-bold ${totalPnl >= 0 ? "text-green-700" : "text-red-600"}`}>
            {totalPnl >= 0 ? "+" : ""}{formatCurrency(totalPnl)}
          </p>
        </div>
      </div>

      {/* Chart + Holdings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Pie Chart */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Allocation</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.fill }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Holdings Table */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
            <h3 className="font-semibold text-gray-900 flex-1">Holdings</h3>
            {/* Search */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search asset..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            >
              <option value="value">Sort: Value</option>
              <option value="pnl">Sort: P&L</option>
              <option value="change">Sort: 24h</option>
            </select>
          </div>

          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Asset</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Holdings</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Price</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Value</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">P&L</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">24h</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((h) => (
                  <tr key={h.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <CoinLogo logo={h.logo} name={h.symbol} />
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{h.coin}</p>
                          <p className="text-xs text-gray-400">{h.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-sm font-medium text-gray-800">{formatNumber(h.holdings, 4)} {h.symbol}</p>
                      <p className="text-xs text-gray-400">@ ${formatNumber(h.avgBuy, 2)}</p>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-800">
                      ${formatNumber(h.currentPrice, 2)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(h.value)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className={`text-sm font-semibold ${h.pnl >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {h.pnl >= 0 ? "+" : ""}{formatCurrency(h.pnl)}
                      </p>
                      <p className={`text-xs ${h.pnlPct >= 0 ? "text-green-500" : "text-red-400"}`}>
                        {h.pnlPct >= 0 ? "+" : ""}{h.pnlPct}%
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`inline-flex items-center gap-0.5 text-sm font-semibold ${h.change24h >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {h.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {Math.abs(h.change24h)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-gray-50">
            {filtered.map((h) => (
              <div key={h.symbol} className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CoinLogo logo={h.logo} name={h.symbol} />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{h.coin}</p>
                    <p className="text-xs text-gray-400">{formatNumber(h.holdings, 4)} {h.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">{formatCurrency(h.value)}</p>
                  <p className={`text-xs font-medium ${h.pnl >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {h.pnl >= 0 ? "+" : ""}{formatCurrency(h.pnl)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}