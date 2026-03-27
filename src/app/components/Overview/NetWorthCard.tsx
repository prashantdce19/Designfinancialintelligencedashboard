import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowUpRight, TrendingUp, TrendingDown, Wallet, PieChart, Activity } from "lucide-react";

const data = [
  { day: '01', value: 450000 },
  { day: '05', value: 462000 },
  { day: '10', value: 458000 },
  { day: '15', value: 475000 },
  { day: '20', value: 482000 },
  { day: '25', value: 479000 },
  { day: '30', value: 495250 },
];

export function NetWorthCard() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => "$" + Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, 495250, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-12 w-full glass-card p-8 relative overflow-hidden flex flex-col md:flex-row gap-8"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8EF7]/10 rounded-full blur-[80px] -z-10" />
      
      {/* Left side: Large number & Sub-stats */}
      <div className="flex-1 flex flex-col justify-between z-10">
        <div>
          <p className="text-gray-400 font-[Inter] font-medium tracking-wide uppercase text-sm mb-2 flex items-center gap-2">
            <Wallet size={16} /> Total Net Worth
          </p>
          <div className="flex items-baseline gap-4">
            <motion.h2 className="text-5xl md:text-6xl font-[Manrope] font-bold text-white tracking-tight">
              {rounded}
            </motion.h2>
            <div className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] px-3 py-1.5 rounded-full border border-[#10B981]/20 backdrop-blur-md">
              <TrendingUp size={16} />
              <span className="font-semibold text-sm">+8.4%</span>
            </div>
          </div>
          <p className="text-gray-500 mt-2 text-sm">vs last 30 days ($45,250)</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <StatBox label="Total Income" value="$14,500" trend="up" icon={<TrendingUp />} color="emerald" />
          <StatBox label="Total Expenses" value="$4,250" trend="down" icon={<TrendingDown />} color="crimson" />
          <StatBox label="Savings Rate" value="70.6%" trend="up" icon={<PieChart />} color="blue" />
          <StatBox label="Investments" value="$385,000" trend="up" icon={<Activity />} color="blue" />
        </div>
      </div>

      {/* Right side: Sparkline */}
      <div className="w-full md:w-1/3 h-48 md:h-auto min-h-[160px] z-10 flex items-end relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart id="networth-sparkline" data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <defs key="defs">
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F8EF7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4F8EF7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              key="tooltip"
              contentStyle={{ backgroundColor: 'rgba(26,31,58,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#4F8EF7' }}
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
    </motion.div>
  );
}

function StatBox({ label, value, trend, icon, color }: { label: string, value: string, trend: 'up'|'down', icon: React.ReactNode, color: 'emerald'|'crimson'|'blue' }) {
  const colorMap = {
    emerald: "text-[#10B981]",
    crimson: "text-[#EF4444]",
    blue: "text-[#4F8EF7]"
  };
  
  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-[Manrope] font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
