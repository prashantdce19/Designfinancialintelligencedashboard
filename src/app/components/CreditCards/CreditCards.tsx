import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  CreditCard, 
  RefreshCcw, 
  Wallet, 
  CheckCircle2, 
  AlertCircle,
  PlaySquare,
  Music,
  Cloud,
  Dumbbell,
  Plane,
  ShoppingBag,
  Coffee
} from "lucide-react";

const cardTabs = ["All Cards", "ICICI Emerald", "Amazon Pay ICICI", "AMEX Platinum Charge", "HDFC Infinia"];

const kpiData = {
  totalSpend: 145000,
  refunds: 12000,
  netSpend: 133000,
  billPayments: 100000,
  outstanding: 33000,
};

const subscriptions = [
  { id: 1, name: "Netflix Premium", amount: 649, date: "12th", icon: <PlaySquare size={24} />, color: "#E50914", card: "Amazon Pay" },
  { id: 2, name: "Spotify Duo", amount: 149, date: "15th", icon: <Music size={24} />, color: "#1DB954", card: "ICICI Emerald" },
  { id: 3, name: "AWS Cloud", amount: 3500, date: "2nd", icon: <Cloud size={24} />, color: "#FF9900", card: "AMEX Platinum" },
  { id: 4, name: "Cult.fit Pro", amount: 1500, date: "5th", icon: <Dumbbell size={24} />, color: "#F43F5E", card: "HDFC Infinia" },
];

const tableData = [
  { 
    id: 1, 
    name: "ICICI Emerald", 
    spend: 85000, 
    refunds: 5000, 
    net: 80000, 
    outstanding: 15000, 
    topCategory: "Travel",
    categoryIcon: <Plane size={16} /> 
  },
  { 
    id: 2, 
    name: "Amazon Pay ICICI", 
    spend: 25000, 
    refunds: 2000, 
    net: 23000, 
    outstanding: 0, 
    topCategory: "Shopping",
    categoryIcon: <ShoppingBag size={16} /> 
  },
  { 
    id: 3, 
    name: "AMEX Platinum Charge", 
    spend: 35000, 
    refunds: 5000, 
    net: 30000, 
    outstanding: 18000, 
    topCategory: "Dining",
    categoryIcon: <Coffee size={16} /> 
  },
];

export function CreditCards() {
  const [activeCard, setActiveCard] = useState("All Cards");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col gap-8">
      
      {/* Top Section: Chip Tabs */}
      <div className="flex items-center gap-3 p-2 glass-card overflow-x-auto custom-scrollbar whitespace-nowrap">
        {cardTabs.map(card => (
          <button
            key={card}
            onClick={() => setActiveCard(card)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative shrink-0 ${
              activeCard === card 
                ? "text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            {activeCard === card && (
              <motion.div 
                layoutId="activeCardTab"
                className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl z-0"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <CreditCard size={16} className={activeCard === card ? "text-[#4F8EF7]" : "text-gray-500"} />
              {card}
            </span>
          </button>
        ))}
      </div>

      {/* KPI Row: 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
              <CreditCard size={20} className="text-[#EF4444]" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Total Spend</h3>
          </div>
          <p className="font-[Manrope] text-2xl lg:text-3xl font-bold text-white">{formatCurrency(kpiData.totalSpend)}</p>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <RefreshCcw size={20} className="text-[#10B981]" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Refunds & Credits</h3>
          </div>
          <p className="font-[Manrope] text-2xl lg:text-3xl font-bold text-white">{formatCurrency(kpiData.refunds)}</p>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
              <Wallet size={20} className="text-[#F59E0B]" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Net Spend</h3>
          </div>
          <p className="font-[Manrope] text-2xl lg:text-3xl font-bold text-white">{formatCurrency(kpiData.netSpend)}</p>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-[#4F8EF7]" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Bill Payments</h3>
          </div>
          <p className="font-[Manrope] text-2xl lg:text-3xl font-bold text-white">{formatCurrency(kpiData.billPayments)}</p>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertCircle size={80} className="text-[#EF4444]" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
              <AlertCircle size={20} className="text-[#8B5CF6]" />
            </div>
            <h3 className="text-gray-400 font-medium text-sm">Outstanding</h3>
          </div>
          <p className="font-[Manrope] text-2xl lg:text-3xl font-bold text-[#8B5CF6] relative z-10">{formatCurrency(kpiData.outstanding)}</p>
        </div>
      </div>

      {/* Middle Section: Subscription Tracker */}
      <div className="glass-card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-[Manrope] text-xl font-bold text-white">Subscription Tracker</h2>
          <button className="text-sm text-[#4F8EF7] hover:text-white transition-colors font-medium">View All</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="min-w-[280px] p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4 group">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `${sub.color}15`, color: sub.color }}
              >
                {sub.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-base">{sub.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-[Manrope] font-bold text-gray-300">{formatCurrency(sub.amount)}<span className="text-xs text-gray-500 font-normal">/mo</span></p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><RefreshCcw size={10} /> {sub.date}</span>
                  <span>•</span>
                  <span className="truncate max-w-[100px]">{sub.card}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Data Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-[Manrope] text-xl font-bold text-white">Card Comparison</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Statement Month:</span>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white outline-none focus:border-[#4F8EF7]/50 transition-colors">
              <option className="bg-[#1A1F3A]">October 2023</option>
              <option className="bg-[#1A1F3A]">September 2023</option>
              <option className="bg-[#1A1F3A]">August 2023</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Card Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Spend</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Refunds</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Net Spend</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Outstanding</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-8 rounded bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                        <CreditCard size={16} className="text-gray-300" />
                      </div>
                      <span className="font-semibold text-white">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] text-gray-300">
                    {formatCurrency(row.spend)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] text-[#10B981]">
                    -{formatCurrency(row.refunds)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] font-bold text-white">
                    {formatCurrency(row.net)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <span className={`font-[Manrope] font-bold ${row.outstanding > 0 ? "text-[#8B5CF6]" : "text-gray-500"}`}>
                      {formatCurrency(row.outstanding)}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                        {row.categoryIcon}
                      </span>
                      {row.topCategory}
                    </div>
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-white/[0.01]">
                <td className="px-6 py-5 whitespace-nowrap font-bold text-white">Total</td>
                <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] font-bold text-white">
                  {formatCurrency(tableData.reduce((acc, curr) => acc + curr.spend, 0))}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] font-bold text-[#10B981]">
                  -{formatCurrency(tableData.reduce((acc, curr) => acc + curr.refunds, 0))}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] font-bold text-white">
                  {formatCurrency(tableData.reduce((acc, curr) => acc + curr.net, 0))}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right font-[Manrope] font-bold text-[#8B5CF6]">
                  {formatCurrency(tableData.reduce((acc, curr) => acc + curr.outstanding, 0))}
                </td>
                <td className="px-6 py-5 whitespace-nowrap"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
