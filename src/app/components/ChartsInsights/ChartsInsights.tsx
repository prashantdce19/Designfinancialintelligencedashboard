import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart
} from "recharts";
import { 
  PieChart as PieChartIcon, 
  TrendingUp, 
  CreditCard, 
  Calendar, 
  BarChart2, 
  Activity 
} from "lucide-react";

// --- MOCK DATA ---

const spendingTrendData = [
  { month: "Jan", income: 120000, bankExpense: 45000, ccSpend: 35000 },
  { month: "Feb", income: 120000, bankExpense: 48000, ccSpend: 32000 },
  { month: "Mar", income: 125000, bankExpense: 42000, ccSpend: 40000 },
  { month: "Apr", income: 125000, bankExpense: 50000, ccSpend: 38000 },
  { month: "May", income: 130000, bankExpense: 46000, ccSpend: 45000 },
  { month: "Jun", income: 130000, bankExpense: 49000, ccSpend: 42000 },
  { month: "Jul", income: 140000, bankExpense: 55000, ccSpend: 50000 },
  { month: "Aug", income: 140000, bankExpense: 52000, ccSpend: 48000 },
  { month: "Sep", income: 145000, bankExpense: 48000, ccSpend: 41000 },
  { month: "Oct", income: 145000, bankExpense: 60000, ccSpend: 55000 },
  { month: "Nov", income: 150000, bankExpense: 58000, ccSpend: 60000 },
  { month: "Dec", income: 180000, bankExpense: 65000, ccSpend: 70000 },
];

const categoryData = [
  { id: "cat-1", name: "Housing", value: 45000, color: "#4F8EF7" },
  { id: "cat-2", name: "Food & Dining", value: 25000, color: "#F59E0B" },
  { id: "cat-3", name: "Transportation", value: 15000, color: "#10B981" },
  { id: "cat-4", name: "Shopping", value: 20000, color: "#8B5CF6" },
  { id: "cat-5", name: "Entertainment", value: 12000, color: "#EC4899" },
  { id: "cat-6", name: "Utilities", value: 8000, color: "#06B6D4" },
];

const topMerchantsData = [
  { id: "m-1", merchant: "Amazon", spend: 45000 },
  { id: "m-2", merchant: "Uber", spend: 32000 },
  { id: "m-3", merchant: "Zomato", spend: 28000 },
  { id: "m-4", merchant: "Swiggy", spend: 24000 },
  { id: "m-5", merchant: "Myntra", spend: 18000 },
  { id: "m-6", merchant: "Flipkart", spend: 16000 },
  { id: "m-7", merchant: "Starbucks", spend: 12000 },
].sort((a, b) => b.spend - a.spend).slice(0, 7);

const incomeVsSavingsData = [
  { month: "Jul", income: 140000, expense: 105000, savings: 35000 },
  { month: "Aug", income: 140000, expense: 100000, savings: 40000 },
  { month: "Sep", income: 145000, expense: 89000, savings: 56000 },
  { month: "Oct", income: 145000, expense: 115000, savings: 30000 },
  { month: "Nov", income: 150000, expense: 118000, savings: 32000 },
  { month: "Dec", income: 180000, expense: 135000, savings: 45000 },
];

const ccUtilizationData = [
  { name: "HDFC Regalia", limit: 500000, used: 125000, color: "#4F8EF7" },
  { name: "AMEX Platinum", limit: 800000, used: 640000, color: "#F59E0B" },
  { name: "SBI SimplyCLICK", limit: 200000, used: 45000, color: "#10B981" },
  { name: "ICICI Amazon Pay", limit: 300000, used: 280000, color: "#EF4444" },
];

// Heatmap mock data (7 days x 4 weeks)
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const heatmapData = Array.from({ length: 4 }).map((_, weekIndex) => {
  return days.map((day, dayIndex) => ({
    id: `w${weekIndex}-d${dayIndex}`,
    day,
    week: weekIndex + 1,
    value: Math.floor(Math.random() * 100)
  }));
}).flat();

export function ChartsInsights() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short"
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1F3A]/95 border border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-item-${index}`} className="flex items-center gap-2 text-sm mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-300">{entry.name}:</span>
              <span className="text-white font-bold">{
                typeof entry.value === 'number' && entry.value > 1000 
                  ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(entry.value)
                  : entry.value
              }</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Helper for Heatmap colors
  const getHeatmapColor = (value: number) => {
    if (value < 20) return 'bg-[#4F8EF7]/10';
    if (value < 40) return 'bg-[#4F8EF7]/30';
    if (value < 60) return 'bg-[#4F8EF7]/50';
    if (value < 80) return 'bg-[#4F8EF7]/70';
    return 'bg-[#4F8EF7] shadow-[0_0_10px_rgba(79,142,247,0.5)]';
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <h1 className="font-[Manrope] text-3xl font-bold text-white tracking-tight">Charts & Insights</h1>
        <p className="text-gray-400 mt-2 text-sm max-w-2xl">
          Visual analytics and deep dives into your spending, income, and overall financial health.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Spending Trend (Spans 2 cols) */}
        <div className="glass-card p-6 lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[Manrope] text-lg font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-[#4F8EF7]" />
              Spending vs Income Trend
            </h2>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart id="spending-trend-chart" data={spendingTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis key="xaxis" dataKey="month" stroke="rgba(255,255,255,0.4)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis key="yaxis" stroke="rgba(255,255,255,0.4)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} width={80} />
                <Tooltip key="tooltip" content={<CustomTooltip />} />
                <Legend key="legend" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#9CA3AF' }} />
                <Line key="line-income" type="monotone" name="Total Income" dataKey="income" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#10B981", stroke: "#1A1F3A", strokeWidth: 2 }} isAnimationActive={false} />
                <Line key="line-expense" type="monotone" name="Bank Expense" dataKey="bankExpense" stroke="#4F8EF7" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#4F8EF7", stroke: "#1A1F3A", strokeWidth: 2 }} isAnimationActive={false} />
                <Line key="line-spend" type="monotone" name="CC Spend" dataKey="ccSpend" stroke="#F59E0B" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#F59E0B", stroke: "#1A1F3A", strokeWidth: 2 }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Category Breakdown (Donut) */}
        <div className="glass-card p-6 flex flex-col min-h-[400px]">
          <h2 className="font-[Manrope] text-lg font-bold text-white flex items-center gap-2 mb-2">
            <PieChartIcon size={18} className="text-[#8B5CF6]" />
            Category Breakdown
          </h2>
          <span className="text-xs text-gray-400 mb-6 block">Current Month Spend</span>
          
          <div className="flex-1 w-full relative min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="category-donut-chart">
                <Pie
                  key="pie-categories"
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                  isAnimationActive={false}
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total</span>
              <span className="text-xl font-[Manrope] font-bold text-white">₹1.25L</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
            {categoryData.slice(0,6).map((cat) => (
              <div key={cat.id} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-300 truncate max-w-[90px]" title={cat.name}>{cat.name}</span>
                  <span className="text-xs font-bold text-white">{formatCurrency(cat.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Top Merchants (Horizontal Bar) */}
        <div className="glass-card p-6 flex flex-col min-h-[360px]">
          <h2 className="font-[Manrope] text-lg font-bold text-white flex items-center gap-2 mb-6">
            <BarChart2 size={18} className="text-[#EC4899]" />
            Top Merchants
          </h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                id="top-merchants-chart"
                layout="vertical"
                data={topMerchantsData}
                margin={{ top: 0, right: 10, left: 20, bottom: 0 }}
              >
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis key="xaxis" type="number" hide />
                <YAxis key="yaxis" dataKey="merchant" type="category" stroke="rgba(255,255,255,0.7)" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip key="tooltip" cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                <Bar key="bar-spend" dataKey="spend" name="Spend" radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={false}>
                  {topMerchantsData.map((entry) => (
                    <Cell key={`bar-${entry.merchant}`} fill={entry.spend > 40000 ? "#EC4899" : "#4F8EF7"} fillOpacity={entry.spend > 40000 ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Day-of-Week Heatmap */}
        <div className="glass-card p-6 flex flex-col min-h-[360px]">
          <h2 className="font-[Manrope] text-lg font-bold text-white flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-[#06B6D4]" />
            Spend Intensity
          </h2>
          <span className="text-xs text-gray-400 mb-6 block">Trailing 4 Weeks by Day</span>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {days.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
              {heatmapData.map((node) => (
                <div 
                  key={node.id} 
                  className={`w-full h-full rounded-md min-h-[40px] transition-colors duration-300 border border-white/5 hover:border-white/40 cursor-crosshair group relative ${getHeatmapColor(node.value)}`}
                >
                  {/* Custom tooltip for heatmap */}
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1A1F3A] border border-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap z-10 pointer-events-none shadow-xl transition-opacity">
                    Intensity: {node.value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-gray-400">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-[#4F8EF7]/10"></div>
              <div className="w-3 h-3 rounded-sm bg-[#4F8EF7]/50"></div>
              <div className="w-3 h-3 rounded-sm bg-[#4F8EF7]"></div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* 5. Income vs Savings (Stacked/Composed Bar) */}
        <div className="glass-card p-6 lg:col-span-2 flex flex-col min-h-[360px]">
          <h2 className="font-[Manrope] text-lg font-bold text-white flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-[#10B981]" />
            Income vs Expense vs Savings
          </h2>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart id="income-savings-chart" data={incomeVsSavingsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis key="xaxis" dataKey="month" stroke="rgba(255,255,255,0.4)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis key="yaxis" stroke="rgba(255,255,255,0.4)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} width={80} />
                <Tooltip key="tooltip" content={<CustomTooltip />} />
                <Legend key="legend" wrapperStyle={{ paddingTop: '10px', fontSize: '12px', color: '#9CA3AF' }} />
                
                {/* Background Income Bar */}
                <Bar key="bar-income" dataKey="income" name="Total Income" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth={1} barSize={32} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                {/* Overlay Expenses and Savings as stacked bars */}
                <Bar key="bar-expense" dataKey="expense" name="Expenses" stackId="a" fill="#EF4444" barSize={32} radius={[0, 0, 0, 0]} isAnimationActive={false} />
                <Bar key="bar-savings" dataKey="savings" name="Net Savings" stackId="a" fill="#10B981" barSize={32} radius={[4, 4, 0, 0]} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. Credit Card Utilization */}
        <div className="glass-card p-6 lg:col-span-1 flex flex-col min-h-[360px]">
          <h2 className="font-[Manrope] text-lg font-bold text-white flex items-center gap-2 mb-2">
            <CreditCard size={18} className="text-[#F59E0B]" />
            Credit Utilization
          </h2>
          <span className="text-xs text-gray-400 mb-6 block">Real-time limits vs unbilled</span>
          
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {ccUtilizationData.map((cc) => {
              const utilPercent = (cc.used / cc.limit) * 100;
              const isHighUtil = utilPercent > 70;
              
              return (
                <div key={cc.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{cc.name}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isHighUtil ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-white/10 text-gray-300'}`}>
                      {utilPercent.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${utilPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: isHighUtil ? '#EF4444' : cc.color 
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-wider">
                    <span>Used: {formatCurrency(cc.used)}</span>
                    <span>Limit: {formatCurrency(cc.limit)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
