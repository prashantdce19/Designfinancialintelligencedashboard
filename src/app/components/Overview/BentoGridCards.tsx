import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { ArrowUpRight, TrendingUp, TrendingDown, Briefcase, Activity } from "lucide-react";

export function NetCashflowCard() {
  const data = [
    { id: "nc-1", name: "Income", value: 14500, color: "#10B981" },
    { id: "nc-2", name: "Expenses", value: 4250, color: "#EF4444" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
      className="col-span-12 md:col-span-4 glass-card p-6 flex flex-col h-80"
    >
      <h3 className="font-[Manrope] text-lg font-bold text-white mb-2">Net Cashflow</h3>
      <p className="text-sm text-gray-400 mb-4">Income vs Expenses (30D)</p>
      
      <div className="flex-1 relative flex items-center justify-center min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart id="net-cashflow-chart">
            <Pie
              key="pie-net"
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell key={entry.id} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              key="tooltip"
              contentStyle={{ backgroundColor: 'rgba(26,31,58,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: any) => `$${value}`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
          <p className="text-xs text-gray-400 font-medium">Net Savings</p>
          <p className="text-xl font-[Manrope] font-bold text-[#10B981]">+$10,250</p>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-sm font-medium">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#10B981]"></span> Income</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Expenses</div>
      </div>
    </motion.div>
  );
}

export function TopSpendingCard() {
  const data = [
    { id: "sp-1", name: "Housing", value: 2100 },
    { id: "sp-2", name: "Food", value: 850 },
    { id: "sp-3", name: "Transport", value: 450 },
    { id: "sp-4", name: "Shopping", value: 350 },
    { id: "sp-5", name: "Utilities", value: 250 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-12 md:col-span-4 glass-card p-6 flex flex-col h-80"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-[Manrope] text-lg font-bold text-white">Top Spending</h3>
          <p className="text-sm text-gray-400">By Category (30D)</p>
        </div>
        <span className="text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded text-xs font-semibold">Warning: Food +15%</span>
      </div>
      
      <div className="flex-1 w-full relative min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart id="investment-pulse-chart" data={data} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis key="xaxis" type="number" hide />
            <YAxis key="yaxis" dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <RechartsTooltip 
              key="tooltip"
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: 'rgba(26,31,58,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
              formatter={(value: any) => `$${value}`}
            />
            <Bar key="bar-investment" dataKey="value" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false}>
              {data.map((entry) => (
                <Cell key={entry.id} fill="#4F8EF7" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function InvestmentPulseCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
      className="col-span-12 md:col-span-4 glass-card p-6 flex flex-col h-80 relative overflow-hidden group hover:border-[#4F8EF7]/30 transition-colors"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-[40px] -z-10" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-white/5 text-[#4F8EF7]">
          <Briefcase size={20} />
        </div>
        <div>
          <h3 className="font-[Manrope] text-lg font-bold text-white">Investment Pulse</h3>
          <p className="text-sm text-gray-400">Live Portfolio</p>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-center gap-6">
        <div>
          <p className="text-sm text-gray-400 mb-1 font-medium">Current Value</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-[Manrope] font-bold text-white tracking-tight">$385,000.45</h2>
            <span className="text-sm text-[#10B981] mb-1 font-semibold flex items-center">
              <TrendingUp size={16} className="mr-1" /> Today
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Activity size={16} className="text-[#4F8EF7]" /> Total P&L
            </div>
            <div className="flex items-center gap-2">
              <span className="font-[Manrope] font-bold text-white">+$42,500</span>
              <span className="text-xs font-semibold bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-md">+12.4%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Activity size={16} className="text-[#4F8EF7]" /> Daily P&L
            </div>
            <div className="flex items-center gap-2">
              <span className="font-[Manrope] font-bold text-white">+$1,240</span>
              <span className="text-xs font-semibold bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-md">+0.3%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
