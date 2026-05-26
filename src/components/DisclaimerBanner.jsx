import React, { useState } from "react";
import { Info, ChevronUp, ChevronDown } from "lucide-react";

export default function DisclaimerBanner() {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-blue-200 rounded-xl bg-blue-50 mb-6 overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Info size={16} className="text-blue-600 flex-shrink-0" />
          Important Notes &amp; Disclaimers
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <ul className="text-xs text-blue-700 space-y-1.5 list-disc list-inside">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult
              your tax advisor before making any decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are handled separately as
              business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from individual exchanges. As a
              result, values may slightly differ from the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation. For now, we are calculating
              everything as long-term.
            </li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
