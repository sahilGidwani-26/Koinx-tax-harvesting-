import React, { useState, useEffect } from "react";
import { AlertCircle, HelpCircle, LayoutDashboard, PieChart, Leaf, Menu, X } from "lucide-react";
import { useTaxHarvesting } from "./hooks/useTaxHarvesting";
import DisclaimerBanner from "./components/DisclaimerBanner";
import CapitalGainsCards from "./components/CapitalGainsCards";
import HoldingsTable from "./components/HoldingsTable";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Dashboard from "./components/Dashboard";
import Portfolio from "./components/Portfolio";
import "./index.css";

function KoinXLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-2xl font-bold text-gray-900 tracking-tight">KoinX</span>
      <span className="text-yellow-400 text-lg">✦</span>
    </div>
  );
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "portfolio", label: "Portfolio", icon: PieChart },
  { id: "tax", label: "Tax", icon: Leaf },
];

function TaxPage() {
  const {
    displayedHoldings,
    holdings,
    selectedRows,
    loading,
    error,
    showAll,
    setShowAll,
    toggleRow,
    toggleAll,
    preHarvesting,
    afterHarvesting,
    preData,
    postData,
    savings,
  } = useTaxHarvesting();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tax Harvesting</h2>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          <HelpCircle size={15} />
          How it works?
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-5 text-red-700">
          <AlertCircle size={20} className="flex-shrink-0" />
          <div>
            <p className="font-semibold">Error loading data</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      ) : (
        <>
          <DisclaimerBanner />
          <CapitalGainsCards
            preHarvesting={preHarvesting}
            afterHarvesting={afterHarvesting}
            preData={preData}
            postData={postData}
            savings={savings}
          />
          <HoldingsTable
            holdings={displayedHoldings}
            selectedRows={selectedRows}
            toggleRow={toggleRow}
            toggleAll={toggleAll}
            showAll={showAll}
            setShowAll={setShowAll}
            total={holdings.length}
          />
        </>
      )}
    </>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Listen for navigation events from child components (Dashboard CTA)
  useEffect(() => {
    const handler = (e) => setActivePage(e.detail);
    window.addEventListener("navigate", handler);
    return () => window.removeEventListener("navigate", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-10 py-4 flex items-center justify-between">
          <KoinXLogo />

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePage === id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Log in
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Sign up
            </button>
            {/* Mobile menu toggle */}
            <button
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen((p) => !p)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 bg-white px-4 pb-3 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActivePage(id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-10 py-6">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "portfolio" && <Portfolio />}
        {activePage === "tax" && <TaxPage />}
      </main>
    </div>
  );
}