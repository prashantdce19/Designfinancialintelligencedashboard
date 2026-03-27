import React from "react";
import { motion } from "motion/react";
import { 
  TrendingUp,
  CreditCard,
  Briefcase,
  Wallet,
  ShoppingBag,
  Plane,
  Coffee,
  Activity,
  ArrowRight
} from "lucide-react";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";

const chartData = [
  { month: "Jan", income: 145000, spend: 82000, savings: 63000 },
  { month: "Feb", income: 145000, spend: 75000, savings: 70000 },
  { month: "Mar", income: 155000, spend: 90000, savings: 65000 },
  { month: "Apr", income: 145000, spend: 85000, savings: 60000 },
  { month: "May", income: 160000, spend: 95000, savings: 65000 },
  { month: "Jun", income: 145000, spend: 78000, savings: 67000 },
  { month: "Jul", income: 150000, spend: 88000, savings: 62000 },
  { month: "Aug", income: 145000, spend: 81000, savings: 64000 },
  { month: "Sep", income: 170000, spend: 110000, savings: 60000 },
  { month: "Oct", income: 145000, spend: 84000, savings: 61000 },
  { month: "Nov", income: 155000, spend: 89000, savings: 66000 },
  { month: "Dec", income: 180000, spend: 105000, savings: 75000 },
];

const ccCategories = [
  { id: 1, name: "Travel & Flights", amount: 45000, percent: 40, icon: <Plane size={18} />, color: "#4F8EF7" },
  { id: 2, name: "Shopping", amount: 32000, percent: 28, icon: <ShoppingBag size={18} />, color: "#8B5CF6" },
  { id: 3, name: "Dining out", amount: 18000, percent: 16, icon: <Coffee size={18} />, color: "#F59E0B" },
  { id: 4, name: "Groceries & Others", amount: 10000, percent: 16, icon: <CreditCard size={18} />, color: "#10B981" },
];

export function CombinedView() {
  const healthScore = 84;
  
  // Gauge Calculation (Half circle)
  const radius = 45;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col gap-8">
      
      {/* Top Center: Health Score Gauge */}
      <div className="glass-card p-8 flex flex-col items-center justify-center max-w-md mx-auto w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Activity size={120} className="text-[#4F8EF7]" />
        </div>
        
        <h2 className="font-[Manrope] text-xl font-bold text-white mb-6">Financial Health Score</h2>
        
        <div className="relative w-full max-w-[240px] aspect-[2/1] flex items-end justify-center">
          <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
            {/* Background Track */}
            <path 
              d="M 5 50 A 45 45 0 0 1 95 50" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="8" 
              strokeLinecap="round" 
            />
            {/* Colored Progress */}
            <motion.path 
              d="M 5 50 A 45 45 0 0 1 95 50" 
              fill="none" 
              stroke="url(#gaugeGradient)" 
              strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute bottom-0 flex flex-col items-center translate-y-2">
            <motion.span 
              className="font-[Manrope] text-5xl font-bold text-white tracking-tighter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {healthScore}
            </motion.span>
            <span className="text-sm text-[#10B981] font-medium mt-1">Excellent Status</span>
          </div>
        </div>
        
        <div className="w-full flex justify-between mt-8 text-xs text-gray-500 font-medium px-4">
          <span>Needs Work</span>
          <span>Great</span>
        </div>
      </div>

      {/* Middle Section: Side-by-side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Sankey-style Bank Flow */}
        <div className="glass-card p-6 lg:p-8 flex flex-col">
          <h2 className="font-[Manrope] text-xl font-bold text-white mb-8">Cash Flow Engine</h2>
          
          <div className="relative flex-1 flex items-center justify-between min-h-[280px]">
            {/* Background SVG for connecting paths */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flowSavings" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="flowExpenses" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Path to Savings (Top Right) */}
              <motion.path 
                d="M 25 50 C 50 50, 50 25, 75 25" 
                fill="none" 
                stroke="url(#flowSavings)" 
                strokeWidth="6" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Path to Expenses (Bottom Right) */}
              <motion.path 
                d="M 25 50 C 50 50, 50 75, 75 75" 
                fill="none" 
                stroke="url(#flowExpenses)" 
                strokeWidth="14" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>

            {/* Nodes/Cards */}
            <div className="w-[35%] z-10">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div>
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-2">
                  <Briefcase size={20} className="text-[#10B981]" />
                </div>
                <h3 className="text-sm text-gray-400 font-medium">Total Income</h3>
                <p className="font-[Manrope] text-xl font-bold text-white mt-1">{formatCurrency(150000)}</p>
              </div>
            </div>

            <div className="w-[40%] z-10 flex flex-col gap-10">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col items-center text-center relative overflow-hidden transform hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="absolute top-0 right-0 w-1 h-full bg-[#10B981]"></div>
                <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-2">
                  <Wallet size={16} className="text-[#10B981]" />
                </div>
                <h3 className="text-sm text-gray-400 font-medium">Net Savings</h3>
                <p className="font-[Manrope] text-lg font-bold text-white mt-1">{formatCurrency(45000)}</p>
                <span className="text-xs text-[#10B981] font-semibold mt-1">30%</span>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col items-center text-center relative overflow-hidden transform hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="absolute top-0 right-0 w-1 h-full bg-[#EF4444]"></div>
                <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-2">
                  <CreditCard size={16} className="text-[#EF4444]" />
                </div>
                <h3 className="text-sm text-gray-400 font-medium">Expenses</h3>
                <p className="font-[Manrope] text-lg font-bold text-white mt-1">{formatCurrency(105000)}</p>
                <span className="text-xs text-[#EF4444] font-semibold mt-1">70%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: CC Spend Breakdown */}
        <div className="glass-card p-6 lg:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[Manrope] text-xl font-bold text-white">Credit Card Spend</h2>
            <div className="flex items-center gap-1 text-sm text-[#4F8EF7] font-medium cursor-pointer hover:text-white transition-colors">
              View All <ArrowRight size={16} />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {ccCategories.map((item, index) => (
              <div key={item.id} className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <span className="font-semibold text-white">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-[Manrope] font-bold text-white block">{formatCurrency(item.amount)}</span>
                    <span className="text-xs text-gray-500">{item.percent}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: 12-Month Stacked Bar & Trend Line */}
      <div className="glass-card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-[Manrope] text-xl font-bold text-white">Yearly Overview</h2>
            <p className="text-sm text-gray-400 mt-1">Income vs Credit Card Spend vs Net Savings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <span className="text-sm text-gray-300">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
              <span className="text-sm text-gray-300">CC Spend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[#4F8EF7] rounded-full"></div>
              <span className="text-sm text-gray-300">Net Savings</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              id="combined-yearly-chart"
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                key="xaxis"
                dataKey="month" 
                stroke="rgba(255,255,255,0.5)" 
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                key="yaxis"
                stroke="rgba(255,255,255,0.5)" 
                tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value / 1000}k`}
                dx={-10}
              />
              <Tooltip
                key="tooltip"
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 31, 58, 0.95)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  color: 'white',
                }}
                itemStyle={{ color: 'white', fontWeight: 600, fontSize: '14px' }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}
                formatter={(value: number, name: string) => [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              {/* Stacked Bars */}
              <Bar key="bar-income" dataKey="income" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={32} isAnimationActive={false} />
              <Bar key="bar-spend" dataKey="spend" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} isAnimationActive={false} />
              
              {/* Trend Line */}
              <Line 
                key="line-savings"
                type="monotone" 
                dataKey="savings" 
                stroke="#4F8EF7" 
                strokeWidth={4} 
                dot={{ r: 6, fill: "#1A1F3A", stroke: "#4F8EF7", strokeWidth: 3 }}
                activeDot={{ r: 8, fill: "#4F8EF7", stroke: "#fff", strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
