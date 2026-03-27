import { useState, useMemo } from "react";
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { TrendingUp, BarChart2, Activity, ShieldAlert, Award, ChevronRight } from "lucide-react";
import { MenuItem, Select, FormControl, InputLabel, Slider } from "@mui/material";

const mutualFunds = [
  {
    id: "mf1",
    name: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap",
    amc: "PPFAS Mutual Fund",
    isin: "INF846K01164",
    launchDate: "May 2013",
    expenseRatio: "0.55%",
    returns1Y: 34.5,
    cagr3Y: 21.2,
    volatility: 12.4,
    sharpeRatio: 1.45,
    isCurrent: true
  },
  {
    id: "mf2",
    name: "HDFC Flexi Cap Fund",
    category: "Flexi Cap",
    amc: "HDFC Mutual Fund",
    isin: "INF179K01131",
    launchDate: "Jan 1995",
    expenseRatio: "0.85%",
    returns1Y: 38.2,
    cagr3Y: 24.1,
    volatility: 14.2,
    sharpeRatio: 1.52,
    isCurrent: false
  },
  {
    id: "mf3",
    name: "Quant Flexi Cap Fund",
    category: "Flexi Cap",
    amc: "Quant Mutual Fund",
    isin: "INF966L01944",
    launchDate: "Sep 2008",
    expenseRatio: "0.77%",
    returns1Y: 45.6,
    cagr3Y: 28.5,
    volatility: 18.1,
    sharpeRatio: 1.35,
    isCurrent: false
  },
  {
    id: "mf4",
    name: "Kotak Flexicap Fund",
    category: "Flexi Cap",
    amc: "Kotak Mutual Fund",
    isin: "INF174K01LS2",
    launchDate: "Sep 2009",
    expenseRatio: "0.62%",
    returns1Y: 28.4,
    cagr3Y: 18.9,
    volatility: 11.8,
    sharpeRatio: 1.25,
    isCurrent: false
  }
];

const mockChartData = [
  { id: "data-jan", date: "Jan", fund: 100000, benchmark: 100000 },
  { id: "data-feb", date: "Feb", fund: 105000, benchmark: 102000 },
  { id: "data-mar", date: "Mar", fund: 103000, benchmark: 99000 },
  { id: "data-apr", date: "Apr", fund: 110000, benchmark: 104000 },
  { id: "data-may", date: "May", fund: 115000, benchmark: 108000 },
  { id: "data-jun", date: "Jun", fund: 112000, benchmark: 106000 },
  { id: "data-jul", date: "Jul", fund: 120000, benchmark: 110000 },
  { id: "data-aug", date: "Aug", fund: 125000, benchmark: 112000 },
  { id: "data-sep", date: "Sep", fund: 122000, benchmark: 110000 },
  { id: "data-oct", date: "Oct", fund: 128000, benchmark: 114000 },
  { id: "data-nov", date: "Nov", fund: 135000, benchmark: 118000 },
  { id: "data-dec", date: "Dec", fund: 142000, benchmark: 120000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

export function MFAnalysis() {
  const [activeTab, setActiveTab] = useState("peer");
  const [selectedFundId, setSelectedFundId] = useState(mutualFunds[0].id);
  const [chartPeriod, setChartPeriod] = useState("1Y");

  // What-If Simulator State
  const [sipAmount, setSipAmount] = useState(15000);
  const [lumpsum, setLumpsum] = useState(100000);
  const [timePeriod, setTimePeriod] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [stepUp, setStepUp] = useState(10);

  const projectionData = useMemo(() => {
    let data = [];
    let currentWealth = lumpsum;
    let totalInvested = lumpsum;
    let currentSip = sipAmount;
    const monthlyRate = expectedReturn / 100 / 12;

    // Push year 0
    data.push({
      year: 0,
      invested: totalInvested,
      wealth: currentWealth,
      returns: 0
    });

    for (let y = 1; y <= timePeriod; y++) {
      for (let m = 1; m <= 12; m++) {
        currentWealth = (currentWealth + currentSip) * (1 + monthlyRate);
        totalInvested += currentSip;
      }
      data.push({
        year: y,
        invested: Math.round(totalInvested),
        wealth: Math.round(currentWealth),
        returns: Math.round(currentWealth - totalInvested)
      });
      // Apply step up at the end of the year
      currentSip = currentSip * (1 + stepUp / 100);
    }
    return data;
  }, [sipAmount, lumpsum, timePeriod, expectedReturn, stepUp]);

  const finalProjection = projectionData[projectionData.length - 1];

  const currentFund = mutualFunds.find(f => f.id === selectedFundId) || mutualFunds[0];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 border-b border-white/10">
          <button 
            className={`pb-4 px-2 font-medium text-sm transition-all relative ${
              activeTab === 'peer' 
                ? 'text-[#4F8EF7]' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('peer')}
          >
            Peer Analytics
            {activeTab === 'peer' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4F8EF7] shadow-[0_0_8px_rgba(79,142,247,0.8)]" />
            )}
          </button>
          <button 
            className={`pb-4 px-2 font-medium text-sm transition-all relative ${
              activeTab === 'whatif' 
                ? 'text-[#4F8EF7]' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('whatif')}
          >
            What-If Simulator
            {activeTab === 'whatif' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4F8EF7] shadow-[0_0_8px_rgba(79,142,247,0.8)]" />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'peer' ? (
        <>
          {/* Top Section: Selection & Metadata */}
          <div className="glass-card p-6 flex flex-col gap-6">
            <div className="w-full max-w-md">
              <FormControl fullWidth variant="outlined" sx={{ 
                '& .MuiOutlinedInput-root': { 
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }, 
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' }, 
                  '&.Mui-focused fieldset': { borderColor: '#4F8EF7' },
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.02)'
                }, 
                '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.6)' },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4F8EF7' }
              }}>
                <InputLabel id="mf-select-label">Select Mutual Fund</InputLabel>
                <Select 
                  labelId="mf-select-label"
                  value={selectedFundId} 
                  onChange={(e) => setSelectedFundId(e.target.value)} 
                  label="Select Mutual Fund" 
                  sx={{ color: 'white' }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#1A1F3A',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
                          '&.Mui-selected': { bgcolor: 'rgba(79,142,247,0.2)' },
                          '&.Mui-selected:hover': { bgcolor: 'rgba(79,142,247,0.3)' }
                        }
                      }
                    }
                  }}
                >
                  {mutualFunds.map(fund => (
                    <MenuItem key={fund.id} value={fund.id}>{fund.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-medium">Category</span>
                <span className="text-sm font-semibold text-white">{currentFund.category}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-medium">AMC</span>
                <span className="text-sm font-semibold text-white">{currentFund.amc}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-medium">ISIN</span>
                <span className="text-sm font-semibold text-white font-mono">{currentFund.isin}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-medium">Launch Date</span>
                <span className="text-sm font-semibold text-white">{currentFund.launchDate}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-medium">Expense Ratio</span>
                <span className="text-sm font-semibold text-[#10B981]">{currentFund.expenseRatio}</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Chart */}
          <div className="glass-card p-6 h-[450px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-[#4F8EF7]" />
                <h3 className="text-lg font-semibold text-white">Value Growth vs Benchmark</h3>
              </div>
              <div className="flex bg-[#1A1F3A]/50 border border-white/10 p-1 rounded-xl">
                {['1Y', '3Y', 'All Time'].map((period) => (
                  <button 
                    key={period} 
                    onClick={() => setChartPeriod(period)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      chartPeriod === period 
                        ? 'bg-[#4F8EF7] text-white shadow-[0_0_10px_rgba(79,142,247,0.3)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={mockChartData} 
                  id="mf-nav-history-chart" 
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="rgba(255,255,255,0.05)" 
                    vertical={false} 
                    key="mf-chart-grid"
                  />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.3)" 
                    tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                    key="mf-chart-xaxis"
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    tickFormatter={formatCurrency} 
                    tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} 
                    tickLine={false} 
                    axisLine={false} 
                    width={70}
                    dx={-10}
                    key="mf-chart-yaxis"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 31, 58, 0.95)', 
                      backdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255,255,255,0.1)', 
                      borderRadius: '12px', 
                      color: '#fff',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}
                    formatter={(value: number) => [formatCurrency(value), undefined]}
                    key="mf-chart-tooltip"
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }} 
                    iconType="circle"
                    key="mf-chart-legend"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fund" 
                    name={currentFund.name} 
                    stroke="#4F8EF7" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={{ r: 6, fill: "#4F8EF7", stroke: "#1A1F3A", strokeWidth: 2 }}
                    isAnimationActive={false} 
                    id="mf-line-fund"
                    key="mf-line-fund-key"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    name="Benchmark (NIFTY 500)" 
                    stroke="#10B981" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={{ r: 6, fill: "#10B981", stroke: "#1A1F3A", strokeWidth: 2 }}
                    isAnimationActive={false} 
                    id="mf-line-benchmark"
                    key="mf-line-benchmark-key"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Section: Peer Comparison Table */}
          <div className="glass-card p-6 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={20} className="text-[#4F8EF7]" />
              <h3 className="text-lg font-semibold text-white">Peer Comparison Ranking</h3>
              <span className="ml-2 px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400 border border-white/10">
                Category: {currentFund.category}
              </span>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar -mx-6 px-6 pb-2">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="pb-4 pl-2 font-medium">Fund Name</th>
                    <th className="pb-4 font-medium text-right">1Y Return</th>
                    <th className="pb-4 font-medium text-right">3Y CAGR</th>
                    <th className="pb-4 font-medium text-right">Volatility</th>
                    <th className="pb-4 font-medium text-right">Sharpe Ratio</th>
                    <th className="pb-4 pr-2 font-medium text-right">Expense Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {mutualFunds
                    .sort((a, b) => b.returns1Y - a.returns1Y)
                    .map((fund) => {
                    const isSelected = fund.id === selectedFundId;
                    return (
                      <tr 
                        key={`peer-${fund.id}`} 
                        className={`border-b border-white/5 transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[linear-gradient(90deg,rgba(79,142,247,0.1)_0%,transparent_100%)] border-l-2 border-l-[#4F8EF7]' 
                            : 'hover:bg-white/[0.02] border-l-2 border-l-transparent'
                        }`}
                        onClick={() => setSelectedFundId(fund.id)}
                      >
                        <td className="py-4 pl-4 text-sm font-medium flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isSelected 
                              ? 'bg-[#4F8EF7]/20 text-[#4F8EF7] border-[#4F8EF7]/30 shadow-[0_0_10px_rgba(79,142,247,0.3)]' 
                              : 'bg-white/5 text-gray-300 border-white/10'
                          }`}>
                            {fund.amc.substring(0,2).toUpperCase()}
                          </div>
                          <span className={isSelected ? 'text-white' : 'text-gray-300'}>{fund.name}</span>
                          {isSelected && (
                            <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#4F8EF7]/20 text-[#4F8EF7] border border-[#4F8EF7]/30 uppercase tracking-wide">
                              Your Fund
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-sm text-right">
                          <span className={`px-2 py-1 rounded-md bg-white/5 ${fund.returns1Y > 0 ? 'text-[#10B981]' : 'text-red-400'}`}>
                            {fund.returns1Y > 0 ? '+' : ''}{fund.returns1Y}%
                          </span>
                        </td>
                        <td className="py-4 text-sm text-right">
                          <span className={`px-2 py-1 rounded-md bg-white/5 ${fund.cagr3Y > 0 ? 'text-[#10B981]' : 'text-red-400'}`}>
                            {fund.cagr3Y > 0 ? '+' : ''}{fund.cagr3Y}%
                          </span>
                        </td>
                        <td className="py-4 text-sm text-right">
                          <div className="flex items-center justify-end gap-1.5 text-gray-300">
                            {fund.volatility}%
                          </div>
                        </td>
                        <td className="py-4 text-sm text-right text-gray-300">{fund.sharpeRatio}</td>
                        <td className="py-4 pr-4 text-sm text-right text-gray-300">{fund.expenseRatio}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
          {/* Controls Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card p-6 flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart2 size={20} className="text-[#4F8EF7]" /> Parameters
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* Lumpsum */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Initial Lumpsum</label>
                    <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded-md">
                      ₹{lumpsum.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Slider 
                    value={lumpsum} 
                    onChange={(_, val) => setLumpsum(val as number)} 
                    min={0} max={1000000} step={10000}
                    sx={{
                      color: '#4F8EF7',
                      '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(79,142,247,0.5)' },
                      '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  />
                </div>

                {/* Monthly SIP */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Monthly SIP</label>
                    <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded-md">
                      ₹{sipAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Slider 
                    value={sipAmount} 
                    onChange={(_, val) => setSipAmount(val as number)} 
                    min={1000} max={200000} step={1000}
                    sx={{
                      color: '#4F8EF7',
                      '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(79,142,247,0.5)' },
                      '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  />
                </div>

                {/* Annual Step-up */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Annual Step-up</label>
                    <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded-md">
                      {stepUp}%
                    </span>
                  </div>
                  <Slider 
                    value={stepUp} 
                    onChange={(_, val) => setStepUp(val as number)} 
                    min={0} max={25} step={1}
                    sx={{
                      color: '#4F8EF7',
                      '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(79,142,247,0.5)' },
                      '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  />
                </div>

                {/* Expected Return */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Expected Return</label>
                    <span className="text-sm font-semibold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-1 rounded-md">
                      {expectedReturn}%
                    </span>
                  </div>
                  <Slider 
                    value={expectedReturn} 
                    onChange={(_, val) => setExpectedReturn(val as number)} 
                    min={5} max={30} step={0.5}
                    sx={{
                      color: '#10B981',
                      '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(16,185,129,0.5)' },
                      '& .MuiSlider-track': { backgroundColor: '#10B981', borderColor: '#10B981' },
                      '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  />
                </div>

                {/* Time Period */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Time Period</label>
                    <span className="text-sm font-semibold text-white bg-white/10 px-2 py-1 rounded-md">
                      {timePeriod} Years
                    </span>
                  </div>
                  <Slider 
                    value={timePeriod} 
                    onChange={(_, val) => setTimePeriod(val as number)} 
                    min={1} max={40} step={1}
                    sx={{
                      color: '#4F8EF7',
                      '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(79,142,247,0.5)' },
                      '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="glass-card p-6 bg-gradient-to-br from-[#4F8EF7]/10 to-transparent border border-[#4F8EF7]/20">
              <h4 className="text-xs text-[#4F8EF7] font-semibold mb-2 uppercase tracking-wider">Pro Tip</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                A 10% annual step-up in your SIP can double your wealth accumulation over a 15-year period compared to a flat SIP. Let the power of compounding work for you.
              </p>
            </div>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-5 border-l-2 border-l-gray-400">
                <span className="text-sm text-gray-400 font-medium">Total Invested</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-white">₹{formatCurrency(finalProjection.invested).replace('₹', '')}</h2>
                </div>
              </div>
              <div className="glass-card p-5 border-l-2 border-l-[#10B981]">
                <span className="text-sm text-gray-400 font-medium">Est. Returns</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-[#10B981]">₹{formatCurrency(finalProjection.returns).replace('₹', '')}</h2>
                </div>
              </div>
              <div className="glass-card p-5 border-l-2 border-l-[#4F8EF7] bg-white/[0.04]">
                <span className="text-sm text-[#4F8EF7] font-medium">Total Wealth</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h2 className="text-3xl font-bold text-white">₹{formatCurrency(finalProjection.wealth).replace('₹', '')}</h2>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="glass-card p-6 flex-1 min-h-[400px] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-6">Wealth Projection</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={projectionData}
                    id="mf-whatif-chart"
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.0}/>
                      </linearGradient>
                      <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      stroke="rgba(255,255,255,0.3)" 
                      tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                      tickFormatter={(val) => `Yr ${val}`}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      tickFormatter={formatCurrency} 
                      tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} 
                      tickLine={false} 
                      axisLine={false} 
                      width={70}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 31, 58, 0.95)', 
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(255,255,255,0.1)', 
                        borderRadius: '12px', 
                        color: '#fff',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                      }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}
                      labelFormatter={(label) => `Year ${label}`}
                      formatter={(value: number, name: string) => [
                        formatCurrency(value), 
                        name === 'invested' ? 'Total Invested' : 'Est. Returns'
                      ]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                    <Area 
                      type="monotone" 
                      dataKey="invested" 
                      name="Total Invested" 
                      stackId="1" 
                      stroke="#9CA3AF" 
                      strokeWidth={2}
                      fill="url(#colorInvested)" 
                      isAnimationActive={false}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="returns" 
                      name="Est. Returns" 
                      stackId="1" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      fill="url(#colorReturns)" 
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
