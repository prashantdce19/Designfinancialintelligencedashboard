import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet,
  Target,
  Briefcase, 
  Send, 
  TrendingUp, 
  RefreshCcw,
  ShoppingBag, 
  Home, 
  Coffee, 
  Car, 
  Shield
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const accounts = ["All Accounts", "ICICI Savings", "IDFC Savings"];

const incomeCategories = [
  { id: 1, name: "Salary", amount: 125000, icon: <Briefcase size={20} />, color: "#4F8EF7", percent: 82.8 },
  { id: 2, name: "UPI Transfers", amount: 15400, icon: <Send size={20} />, color: "#10B981", percent: 10.2 },
  { id: 3, name: "Investments", amount: 8500, icon: <TrendingUp size={20} />, color: "#F59E0B", percent: 5.6 },
  { id: 4, name: "Refunds", amount: 2100, icon: <RefreshCcw size={20} />, color: "#8B5CF6", percent: 1.4 },
];

const expenseCategories = [
  { id: 1, name: "Shopping", amount: 32000, count: 14, icon: <ShoppingBag size={20} />, color: "#EF4444" },
  { id: 2, name: "Housing", amount: 28000, count: 1, icon: <Home size={20} />, color: "#F59E0B" },
  { id: 3, name: "Food & Dining", amount: 15600, count: 28, icon: <Coffee size={20} />, color: "#10B981" },
  { id: 4, name: "Transport", amount: 8500, count: 12, icon: <Car size={20} />, color: "#4F8EF7" },
  { id: 5, name: "Insurance", amount: 5000, count: 1, icon: <Shield size={20} />, color: "#8B5CF6" },
];

export function BankAccounts() {
  const [activeAccount, setActiveAccount] = useState("All Accounts");
  const [activeIncomeId, setActiveIncomeId] = useState<number | null>(1);

  // Totals based on mock data
  const totalIncome = 151000;
  const totalExpenses = 89100;
  const netCashflow = totalIncome - totalExpenses;
  const savingsRate = Math.round((netCashflow / totalIncome) * 100);

  // SVG Circular Progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (savingsRate / 100) * circumference;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col gap-8">
      
      {/* Sub-filter Header */}
      <div className="flex items-center gap-2 p-1.5 glass-card w-max">
        {accounts.map(account => (
          <button
            key={account}
            onClick={() => setActiveAccount(account)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
              activeAccount === account 
                ? "text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            {activeAccount === account && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-[#4F8EF7] rounded-xl z-0"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{account}</span>
          </button>
        ))}
      </div>

      {/* Top Section: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ArrowUpRight size={80} className="text-[#10B981]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                <ArrowUpRight size={20} className="text-[#10B981]" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Income</h3>
            </div>
            <p className="font-[Manrope] text-3xl font-bold text-white">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-[#10B981] font-semibold flex items-center"><ArrowUpRight size={14} className="mr-0.5" /> 12.5%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ArrowDownRight size={80} className="text-[#EF4444]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                <ArrowDownRight size={20} className="text-[#EF4444]" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Expenses</h3>
            </div>
            <p className="font-[Manrope] text-3xl font-bold text-white">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-[#EF4444] font-semibold flex items-center"><ArrowUpRight size={14} className="mr-0.5" /> 4.2%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} className="text-[#4F8EF7]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center">
                <Wallet size={20} className="text-[#4F8EF7]" />
              </div>
              <h3 className="text-gray-400 font-medium">Net Cashflow</h3>
            </div>
            <p className="font-[Manrope] text-3xl font-bold text-white">{formatCurrency(netCashflow)}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-[#10B981] font-semibold flex items-center"><ArrowUpRight size={14} className="mr-0.5" /> 24.1%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center justify-between relative">
          <div className="flex flex-col h-full justify-between z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                <Target size={20} className="text-[#F59E0B]" />
              </div>
              <h3 className="text-gray-400 font-medium">Savings Rate</h3>
            </div>
            <div>
              <p className="font-[Manrope] text-3xl font-bold text-white">{savingsRate}%</p>
              <p className="text-sm text-gray-500 mt-1">Excellent!</p>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                className="text-white/5"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="48"
                cy="48"
              />
              <motion.circle
                className="text-[#F59E0B]"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="48"
                cy="48"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#F59E0B]">
              {savingsRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Income Breakdown */}
        <div className="glass-card p-8 flex flex-col h-[600px]">
          <h2 className="font-[Manrope] text-xl font-bold text-white mb-6">Income Breakdown</h2>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {incomeCategories.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveIncomeId(item.id)}
                className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 ${
                  activeIncomeId === item.id 
                    ? "bg-white/10 border-white/20 shadow-lg" 
                    : "bg-white/[0.02] border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.percent}% of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-[Manrope] font-bold text-xl text-white">{formatCurrency(item.amount)}</p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Expense Breakdown */}
        <div className="glass-card p-8 flex flex-col h-[600px]">
          <h2 className="font-[Manrope] text-xl font-bold text-white mb-6">Expense Breakdown</h2>
          
          <div className="flex flex-col h-full">
            {/* Donut Chart */}
            <div className="h-[200px] w-full relative mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart id="expense-breakdown-chart">
                  <Pie
                    key="pie-expenses"
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="amount"
                    nameKey="name"
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    key="tooltip"
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 31, 58, 0.9)', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: 'white',
                      fontWeight: 500
                    }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-400">Total</span>
                <span className="font-[Manrope] font-bold text-xl text-white">{formatCurrency(totalExpenses)}</span>
              </div>
            </div>

            {/* Ranked List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {expenseCategories.sort((a, b) => b.amount - a.amount).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="w-6 text-center text-sm font-bold text-gray-500 group-hover:text-gray-300">
                      #{index + 1}
                    </div>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.count} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatCurrency(item.amount)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Avg {formatCurrency(item.amount / item.count)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
