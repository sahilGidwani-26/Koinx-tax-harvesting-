import React from "react";
import { Zap } from "lucide-react";
import { formatCurrency } from "../lib/utils";

function GainsCard({ title, data, realised, effectiveGains, savings, isAfter }) {
  if (!data) return null;
  const stcgNet = data.stcg.profits + data.stcg.losses;
  const ltcgNet = data.ltcg.profits + data.ltcg.losses;

  return (
    <div
      className={`rounded-2xl p-5 flex-1 min-w-0 ${
        isAfter
          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white"
          : "bg-white border border-gray-200"
      }`}
    >
      <h3 className={`font-semibold text-base mb-4 ${isAfter ? "text-white" : "text-gray-800"}`}>
        {title}
      </h3>

      {/* Header row */}
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${isAfter ? "text-blue-200" : "text-gray-400"}`}></span>
        <div className="flex gap-8 sm:gap-12">
          <span className={`text-xs font-semibold w-24 text-right ${isAfter ? "text-blue-200" : "text-gray-400"}`}>
            Short-term
          </span>
          <span className={`text-xs font-semibold w-24 text-right ${isAfter ? "text-blue-200" : "text-gray-400"}`}>
            Long-term
          </span>
        </div>
      </div>

      <div className={`divide-y ${isAfter ? "divide-blue-500" : "divide-gray-100"}`}>
        <div className="py-2 flex items-center justify-between">
          <span className={`text-sm ${isAfter ? "text-blue-100" : "text-gray-600"}`}>Profits</span>
          <div className="flex gap-8 sm:gap-12">
            <span className={`text-sm w-24 text-right ${isAfter ? "text-green-300" : "text-green-600"}`}>
              {formatCurrency(data.stcg.profits)}
            </span>
            <span className={`text-sm w-24 text-right ${isAfter ? "text-green-300" : "text-green-600"}`}>
              {formatCurrency(data.ltcg.profits)}
            </span>
          </div>
        </div>
        <div className="py-2 flex items-center justify-between">
          <span className={`text-sm ${isAfter ? "text-blue-100" : "text-gray-600"}`}>Losses</span>
          <div className="flex gap-8 sm:gap-12">
            <span className={`text-sm w-24 text-right text-red-${isAfter ? "300" : "500"}`}>
              {formatCurrency(data.stcg.losses)}
            </span>
            <span className={`text-sm w-24 text-right text-red-${isAfter ? "300" : "500"}`}>
              {formatCurrency(data.ltcg.losses)}
            </span>
          </div>
        </div>
        <div className="py-2 flex items-center justify-between">
          <span className={`text-sm font-semibold ${isAfter ? "text-white" : "text-gray-800"}`}>
            Net Capital Gains
          </span>
          <div className="flex gap-8 sm:gap-12">
            <span
              className={`text-sm font-semibold w-24 text-right ${
                stcgNet < 0 ? "text-red-300" : "text-green-300"
              } ${!isAfter && (stcgNet < 0 ? "text-red-500" : "text-green-600")}`}
            >
              {formatCurrency(stcgNet)}
            </span>
            <span
              className={`text-sm font-semibold w-24 text-right ${
                ltcgNet < 0 ? "text-red-300" : "text-green-300"
              } ${!isAfter && (ltcgNet < 0 ? "text-red-500" : "text-green-600")}`}
            >
              {formatCurrency(ltcgNet)}
            </span>
          </div>
        </div>
      </div>

      <div className={`mt-4 pt-4 border-t ${isAfter ? "border-blue-500" : "border-gray-200"}`}>
        {isAfter ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Effective Capital Gains:</span>
              <span className="text-xl font-bold text-white">{formatCurrency(effectiveGains)}</span>
            </div>
            {savings > 0 && (
              <div className="mt-3 flex items-center gap-2 bg-blue-500/50 rounded-lg px-3 py-2">
                <Zap size={14} className="text-yellow-300 flex-shrink-0" />
                <span className="text-xs text-blue-100">
                  You are going to save upto{" "}
                  <span className="font-bold text-white">{formatCurrency(savings)}</span>
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Realised Capital Gains:</span>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(realised)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CapitalGainsCards({ preHarvesting, afterHarvesting, preData, postData, savings }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <GainsCard
        title="Pre Harvesting"
        data={preHarvesting}
        realised={preData.realised}
        isAfter={false}
      />
      <GainsCard
        title="After Harvesting"
        data={afterHarvesting}
        effectiveGains={postData.realised}
        savings={savings}
        isAfter={true}
      />
    </div>
  );
}