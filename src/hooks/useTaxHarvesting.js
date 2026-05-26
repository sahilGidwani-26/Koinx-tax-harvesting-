import { useState, useEffect, useCallback } from "react";
import { fetchHoldings, fetchCapitalGains } from "../data/mockApi";

export function useTaxHarvesting() {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [h, cg] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
        setHoldings(h);
        setCapitalGains(cg);
      } catch (e) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleRow = useCallback((coinName) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(coinName)) {
        next.delete(coinName);
      } else {
        next.add(coinName);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (selectedRows.size === holdings.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(holdings.map((h) => h.coinName)));
    }
  }, [holdings, selectedRows.size]);

  // Compute "After Harvesting" capital gains
  const afterHarvesting = useCallback(() => {
    if (!capitalGains) return null;

    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.ltcg.losses;

    selectedRows.forEach((coinName) => {
      const holding = holdings.find((h) => h.coinName === coinName);
      if (!holding) return;

      const stcgGain = holding.stcg.gain;
      const ltcgGain = holding.ltcg.gain;

      if (stcgGain > 0) stcgProfits += stcgGain;
      else stcgLosses += stcgGain;

      if (ltcgGain > 0) ltcgProfits += ltcgGain;
      else ltcgLosses += ltcgGain;
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [capitalGains, selectedRows, holdings]);

  const preHarvesting = capitalGains;

  const computeSummary = (gains) => {
    if (!gains) return { stcgNet: 0, ltcgNet: 0, realised: 0 };
    const stcgNet = gains.stcg.profits + gains.stcg.losses;
    const ltcgNet = gains.ltcg.profits + gains.ltcg.losses;
    return {
      stcgNet,
      ltcgNet,
      realised: stcgNet + ltcgNet,
    };
  };

  const preData = computeSummary(preHarvesting);
  const postData = computeSummary(afterHarvesting());

  const savings = preData.realised - postData.realised;

  const displayedHoldings = showAll ? holdings : holdings.slice(0, 5);

  return {
    holdings,
    displayedHoldings,
    capitalGains,
    selectedRows,
    loading,
    error,
    showAll,
    setShowAll,
    toggleRow,
    toggleAll,
    preHarvesting,
    afterHarvesting: afterHarvesting(),
    preData,
    postData,
    savings,
  };
}
