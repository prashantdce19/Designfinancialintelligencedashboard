import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Camera, 
  BarChart2, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Briefcase
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

type HoldingType = 'Stock' | 'MF';

interface Holding {
  id: string;
  symbol: string;
  name: string;
  type: HoldingType;
  units: number;
  avgCost: number;
  currentPrice: number;
  sparkline: { x: number; val: number }[];
}

const historyData = [
  { date: "Jan", value: 450000, invested: 400000 },
  { date: "Feb", value: 480000, invested: 420000 },
  { date: "Mar", value: 460000, invested: 440000 },
  { date: "Apr", value: 510000, invested: 450000 },
  { date: "May", value: 540000, invested: 460000 },
  { date: "Jun", value: 530000, invested: 470000 },
  { date: "Jul", value: 580000, invested: 480000 },
  { date: "Aug", value: 610000, invested: 490000 },
  { date: "Sep", value: 600000, invested: 500000 },
  { date: "Oct", value: 650000, invested: 510000 },
  { date: "Nov", value: 680000, invested: 520000 },
  { date: "Dec", value: 725450, invested: 540000 },
];

const mockHoldings: Holding[] = [
  {
    id: "1", symbol: "HDFCBANK", name: "HDFC Bank Ltd.", type: "Stock",
    units: 150, avgCost: 1450, currentPrice: 1680.50,
    sparkline: [{x:1, val: 1600}, {x:2, val: 1620}, {x:3, val: 1610}, {x:4, val: 1650}, {x:5, val: 1640}, {x:6, val: 1670}, {x:7, val: 1680.50}]
  },
  {
    id: "2", symbol: "RELIANCE", name: "Reliance Ind.", type: "Stock",
    units: 50, avgCost: 2100, currentPrice: 2450.75,
    sparkline: [{x:1, val: 2350}, {x:2, val: 2380}, {x:3, val: 2360}, {x:4, val: 2400}, {x:5, val: 2420}, {x:6, val: 2410}, {x:7, val: 2450.75}]
  },
  {
    id: "3", symbol: "PPFAS", name: "Parag Parikh Flexi Cap", type: "MF",
    units: 1250.45, avgCost: 45.20, currentPrice: 62.40,
    sparkline: [{x:1, val: 60}, {x:2, val: 60.5}, {x:3, val: 61}, {x:4, val: 60.8}, {x:5, val: 61.5}, {x:6, val: 62}, {x:7, val: 62.40}]
  },
  {
    id: "4", symbol: "INFY", name: "Infosys Ltd.", type: "Stock",
    units: 100, avgCost: 1550, currentPrice: 1420.25,
    sparkline: [{x:1, val: 1500}, {x:2, val: 1480}, {x:3, val: 1450}, {x:4, val: 1460}, {x:5, val: 1440}, {x:6, val: 1430}, {x:7, val: 1420.25}]
  },
  {
    id: "5", symbol: "NIFTYBEES", name: "Nippon India Nifty 50", type: "MF",
    units: 450, avgCost: 180, currentPrice: 225.50,
    sparkline: [{x:1, val: 215}, {x:2, val: 218}, {x:3, val: 220}, {x:4, val: 219}, {x:5, val: 222}, {x:6, val: 224}, {x:7, val: 225.50}]
  },
  {
    id: "6", symbol: "TCS", name: "Tata Consultancy", type: "Stock",
    units: 40, avgCost: 3200, currentPrice: 3850.00,
    sparkline: [{x:1, val: 3700}, {x:2, val: 3750}, {x:3, val: 3720}, {x:4, val: 3780}, {x:5, val: 3800}, {x:6, val: 3820}, {x:7, val: 3850}]
  },
];

export function Portfolio() {
  const [filter, setFilter] = useState<'All' | 'MF' | 'Stock'>('All');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // KPI Calculations
  const currentTotal = 725450;
  const investedTotal = 540000;
  const totalPnL = currentTotal - investedTotal;
  const totalPnLPercent = (totalPnL / investedTotal) * 100;
  const todaysPnL = 4520; // Mock positive day
  const todaysPnLPercent = 0.62;

  const filteredHoldings = mockHoldings.filter(h => filter === 'All' || h.type === filter);

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col gap-8">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-[Manrope] text-3xl font-bold text-white tracking-tight">Portfolio</h1>
          <p className="text-gray-400 mt-2 text-sm max-w-2xl">
            Live tracking of your equity and mutual fund investments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <span className="text-sm font-medium text-gray-300">Auto-refresh</span>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoRefresh ? 'bg-[#10B981]' : 'bg-gray-600'}`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${autoRefresh ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-medium text-sm">
            <RefreshCw size={16} className={autoRefresh ? "animate-spin-slow" : ""} />
            Refresh
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-medium text-sm">
            <BarChart2 size={16} className="text-[#8B5CF6]" />
            MF Analytics
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F8EF7] text-white hover:bg-[#3b7ae0] transition-colors shadow-[0_0_15px_rgba(79,142,247,0.3)] font-medium text-sm">
            <Camera size={16} />
            Capture Snapshot
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors">
            <Briefcase size={100} />
          </div>
          <span className="text-sm font-semibold text-gray-400 mb-2 relative z-10">Current Value</span>
          <span className="font-[Manrope] text-3xl font-bold text-white relative z-10">{formatCurrency(currentTotal)}</span>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-400 mb-2">Total Invested</span>
          <span className="font-[Manrope] text-3xl font-bold text-white">{formatCurrency(investedTotal)}</span>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-400 mb-2">Total Returns</span>
          <div className="flex items-end gap-3">
            <span className={`font-[Manrope] text-3xl font-bold ${totalPnL >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
            </span>
            <div className={`flex items-center gap-1 text-sm font-bold mb-1.5 px-2 py-0.5 rounded ${totalPnL >= 0 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
              {totalPnL >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(totalPnLPercent).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-400 mb-2">Today's P&L</span>
          <div className="flex items-end gap-3">
            <span className={`font-[Manrope] text-3xl font-bold ${todaysPnL >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {todaysPnL >= 0 ? '+' : ''}{formatCurrency(todaysPnL)}
            </span>
            <div className={`flex items-center gap-1 text-sm font-bold mb-1.5 px-2 py-0.5 rounded ${todaysPnL >= 0 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
              {todaysPnL >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(todaysPnLPercent).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Portfolio History Chart */}
      <div className="glass-card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-[Manrope] text-xl font-bold text-white">Portfolio History</h2>
            <p className="text-sm text-gray-400 mt-1">Growth of your portfolio over the last 12 months</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4F8EF7]"></div>
              <span className="text-sm text-gray-300">Current Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <span className="text-sm text-gray-300">Invested</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart id="portfolio-history-chart" data={historyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs key="defs">
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F8EF7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F8EF7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                key="xaxis"
                dataKey="date" 
                stroke="rgba(255,255,255,0.4)" 
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                key="yaxis"
                stroke="rgba(255,255,255,0.4)" 
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `₹${val/1000}k`}
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
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
              <Area 
                key="area-invested"
                type="monotone" 
                dataKey="invested" 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth={2}
                fill="transparent"
                strokeDasharray="5 5"
                isAnimationActive={false}
              />
              <Area 
                key="area-value"
                type="monotone" 
                dataKey="value" 
                stroke="#4F8EF7" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Holdings Grid */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-[Manrope] text-xl font-bold text-white">Current Holdings</h2>
          
          {/* Segmented Control */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {['All', 'Stock', 'MF'].map(type => (
              <button 
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === type 
                    ? 'bg-[#4F8EF7] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type === 'Stock' ? 'Stocks' : type === 'MF' ? 'Mutual Funds' : 'All Holdings'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHoldings.map((holding) => {
            const totalValue = holding.units * holding.currentPrice;
            const totalCost = holding.units * holding.avgCost;
            const pnl = totalValue - totalCost;
            const pnlPercent = (pnl / totalCost) * 100;
            const isPositive = pnl >= 0;

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={holding.id} 
                className="glass-card p-6 flex flex-col group hover:border-[#4F8EF7]/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-[Manrope] font-bold text-lg text-white">{holding.symbol}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        holding.type === 'Stock' 
                          ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20' 
                          : 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20'
                      }`}>
                        {holding.type}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{holding.name}</span>
                  </div>
                  
                  {/* Mini Sparkline */}
                  <div className="w-20 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        id={`sparkline-${holding.id}`}
                        data={holding.sparkline} 
                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                        width={80}
                        height={40}
                      >
                        <Line 
                          key={`line-sparkline-${holding.id}`}
                          type="monotone" 
                          dataKey="val" 
                          stroke={isPositive ? "#10B981" : "#EF4444"} 
                          strokeWidth={2} 
                          dot={false} 
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wider">Units</span>
                    <span className="text-sm font-medium text-gray-300">{holding.units.toLocaleString('en-IN', { maximumFractionDigits: 3 })}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wider">Avg Cost</span>
                    <span className="text-sm font-medium text-gray-300">{formatCurrency(holding.avgCost)}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wider">LTP</span>
                    <span className="text-sm font-medium text-white">{formatCurrency(holding.currentPrice)}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wider">Curr. Value</span>
                    <span className="text-sm font-bold text-white">{formatCurrency(totalValue)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-sm font-semibold text-gray-400">Total Return</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {isPositive ? '+' : ''}{formatCurrency(pnl)}
                    </span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isPositive ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                      {isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
