import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency, formatNumber } from "../lib/utils";

function CoinLogo({ logo, name }) {
  return (
    <img
      src={logo}
      alt={name}
      className="w-7 h-7 rounded-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://ui-avatars.com/api/?name=${name}&background=1A56DB&color=fff&size=28`;
      }}
    />
  );
}

function GainCell({ gain, balance, symbol, isSelected }) {
  const isPositive = gain >= 0;
  return (
    <div>
      <span
        className={`text-sm font-semibold block ${
          isSelected
            ? isPositive
              ? "text-green-400"
              : "text-red-400"
            : isPositive
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {formatCurrency(gain)}
      </span>
      <span className={`text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
        {formatNumber(balance)} {symbol}
      </span>
    </div>
  );
}

export default function HoldingsTable({
  holdings,
  selectedRows,
  toggleRow,
  toggleAll,
  showAll,
  setShowAll,
  total,
}) {
  const allSelected = selectedRows.size === total;
  const someSelected = selectedRows.size > 0 && !allSelected;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-base">Holdings</h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-5 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => el && (el.indeterminate = someSelected)}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Asset
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Holdings
                <br />
                <span className="normal-case font-normal text-gray-400">Avg Buy Price</span>
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Current Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Short-Term Gain
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Long-Term Gain
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {holdings.map((holding) => {
              const isSelected = selectedRows.has(holding.coinName);
              return (
                <tr
                  key={holding.coinName}
                  onClick={() => toggleRow(holding.coinName)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(holding.coinName)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-gray-300 text-blue-400 cursor-pointer accent-blue-400"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <CoinLogo logo={holding.logo} name={holding.coinName} />
                      <div>
                        <p className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-900"}`}>
                          {holding.coin}
                        </p>
                        <p className={`text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                          {holding.coinName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className={`font-medium text-sm ${isSelected ? "text-white" : "text-gray-800"}`}>
                      {formatNumber(holding.totalHoldings)} {holding.coinName}
                    </p>
                    <p className={`text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                      ${formatNumber(holding.averageBuyPrice, 2)}/{holding.coinName}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className={`font-medium text-sm ${isSelected ? "text-white" : "text-gray-800"}`}>
                      ${formatNumber(holding.currentPrice, 2)}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <GainCell
                      gain={holding.stcg.gain}
                      balance={holding.stcg.balance}
                      symbol={holding.coinName}
                      isSelected={isSelected}
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <GainCell
                      gain={holding.ltcg.gain}
                      balance={holding.ltcg.balance}
                      symbol={holding.coinName}
                      isSelected={isSelected}
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>
                      {isSelected
                        ? `${formatNumber(holding.totalHoldings)} ${holding.coinName}`
                        : "—"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {holdings.map((holding) => {
          const isSelected = selectedRows.has(holding.coinName);
          return (
            <div
              key={holding.coinName}
              onClick={() => toggleRow(holding.coinName)}
              className={`px-4 py-4 cursor-pointer transition-colors ${
                isSelected ? "bg-blue-600" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRow(holding.coinName)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-400 mt-1"
                  />
                  <CoinLogo logo={holding.logo} name={holding.coinName} />
                  <div>
                    <p className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-900"}`}>
                      {holding.coin}
                    </p>
                    <p className={`text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                      {holding.coinName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium text-sm ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {formatNumber(holding.totalHoldings)} {holding.coinName}
                  </p>
                  <p className={`text-xs ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                    @ ${formatNumber(holding.averageBuyPrice, 2)}
                  </p>
                </div>
              </div>
              <div className="mt-3 ml-11 grid grid-cols-2 gap-2">
                <div className={`rounded-lg px-3 py-2 ${isSelected ? "bg-blue-500/50" : "bg-gray-50"}`}>
                  <p className={`text-xs mb-1 ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                    Short-term
                  </p>
                  <GainCell
                    gain={holding.stcg.gain}
                    balance={holding.stcg.balance}
                    symbol={holding.coinName}
                    isSelected={isSelected}
                  />
                </div>
                <div className={`rounded-lg px-3 py-2 ${isSelected ? "bg-blue-500/50" : "bg-gray-50"}`}>
                  <p className={`text-xs mb-1 ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                    Long-term
                  </p>
                  <GainCell
                    gain={holding.ltcg.gain}
                    balance={holding.ltcg.balance}
                    symbol={holding.coinName}
                    isSelected={isSelected}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All / Less toggle */}
      {total > 5 && (
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            onClick={() => setShowAll((p) => !p)}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {showAll ? (
              <>
                Show less <ChevronUp size={16} />
              </>
            ) : (
              <>
                View all <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
