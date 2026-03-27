import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CreditCard, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  X, 
  Zap, 
  Check, 
  ArrowRight,
  RefreshCw
} from "lucide-react";

type AlertStatus = 'Matched' | 'Pending';

interface Alert {
  id: string;
  timestamp: string;
  merchant: string;
  cardLast4: string;
  bank: string;
  amount: number;
  status: AlertStatus;
}

interface Candidate {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  confidence: number;
}

const mockAlerts: Alert[] = [
  { id: 'ALT-101', timestamp: 'Today, 10:45 AM', merchant: 'Amazon Web Services', cardLast4: '3024', bank: 'AMEX', amount: 4500, status: 'Pending' },
  { id: 'ALT-102', timestamp: 'Today, 09:12 AM', merchant: 'Starbucks Coffee', cardLast4: '8841', bank: 'ICICI', amount: 850, status: 'Matched' },
  { id: 'ALT-103', timestamp: 'Yesterday, 08:30 PM', merchant: 'Uber India', cardLast4: '3024', bank: 'AMEX', amount: 1240, status: 'Pending' },
  { id: 'ALT-104', timestamp: 'Yesterday, 02:15 PM', merchant: 'Zomato Food Delivery', cardLast4: '8841', bank: 'ICICI', amount: 640, status: 'Matched' },
  { id: 'ALT-105', timestamp: 'Oct 24, 11:20 AM', merchant: 'Apple Services', cardLast4: '9922', bank: 'HDFC', amount: 999, status: 'Pending' },
  { id: 'ALT-106', timestamp: 'Oct 23, 06:45 PM', merchant: 'MakeMyTrip Flights', cardLast4: '3024', bank: 'AMEX', amount: 12500, status: 'Matched' },
];

const mockCandidates: Candidate[] = [
  { id: 'CAN-1', date: 'Oct 26, 2023', merchant: 'AWS EMEA SARL', amount: 4500, confidence: 98 },
  { id: 'CAN-2', date: 'Oct 26, 2023', merchant: 'Amazon Seller Services', amount: 4500, confidence: 85 },
  { id: 'CAN-3', date: 'Oct 25, 2023', merchant: 'Amazon Pay Balance', amount: 4000, confidence: 45 },
  { id: 'CAN-4', date: 'Oct 24, 2023', merchant: 'DigitalOcean Cloud', amount: 4550, confidence: 30 },
  { id: 'CAN-5', date: 'Oct 20, 2023', merchant: 'AWS EMEA SARL', amount: 4100, confidence: 25 },
];

export function UnbilledAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // KPI Calculations
  const totalUnbilled = 84500;
  const pendingCount = 12;
  const autoMatchedCount = 45;
  const reconRate = 78;

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (reconRate / 100) * circumference;

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col gap-8 relative">
      
      {/* Header */}
      <div>
        <h1 className="font-[Manrope] text-3xl font-bold text-white tracking-tight">Email Alerts</h1>
        <p className="text-gray-400 mt-2 text-sm max-w-2xl">
          Transactions parsed directly from your email alerts. Review unbilled expenses and reconcile them with your statements.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
              <CreditCard size={20} className="text-[#EF4444]" />
            </div>
            <span className="text-sm font-semibold text-gray-300">Total Unbilled</span>
          </div>
          <span className="font-[Manrope] text-3xl font-bold text-white">{formatCurrency(totalUnbilled)}</span>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
              <AlertCircle size={20} className="text-[#F59E0B]" />
            </div>
            <span className="text-sm font-semibold text-gray-300">Pending Recon</span>
          </div>
          <span className="font-[Manrope] text-3xl font-bold text-white">{pendingCount} <span className="text-sm text-gray-500 font-normal">alerts</span></span>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-gray-300">Auto-Matched</span>
          </div>
          <span className="font-[Manrope] text-3xl font-bold text-white">{autoMatchedCount} <span className="text-sm text-gray-500 font-normal">alerts</span></span>
        </div>

        <div className="glass-card p-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-300 mb-2">Reconciliation Rate</span>
            <span className="font-[Manrope] text-3xl font-bold text-white">{reconRate}%</span>
            <span className="text-xs text-gray-400 mt-1">Last 30 days</span>
          </div>
          
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
              <circle 
                cx="30" cy="30" r="24" 
                fill="none" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="6" 
              />
              <motion.circle 
                cx="30" cy="30" r="24" 
                fill="none" 
                stroke="#4F8EF7" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <RefreshCw size={16} className="text-[#4F8EF7]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Alert Feed */}
      <div className="flex flex-col gap-4 max-w-4xl">
        <h2 className="font-[Manrope] text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Mail size={18} className="text-gray-400" />
          Recent Parsed Alerts
        </h2>
        
        {mockAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
              selectedAlert?.id === alert.id ? 'ring-2 ring-[#4F8EF7]/50 bg-white/[0.08]' : 'hover:bg-white/[0.07]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-white text-sm">{alert.bank[0]}</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white text-base">{alert.merchant}</h3>
                  {alert.status === 'Matched' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                      <CheckCircle2 size={10} /> Matched
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                      <AlertCircle size={10} /> Pending
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Mail size={12} /> {alert.timestamp}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="flex items-center gap-1"><CreditCard size={12} /> {alert.bank} •••• {alert.cardLast4}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 ml-16 sm:ml-0">
              <div className="text-left sm:text-right">
                <span className="font-[Manrope] text-lg font-bold text-white block">{formatCurrency(alert.amount)}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Billed Amt</span>
              </div>
              
              <div className="w-32 flex justify-end">
                {alert.status === 'Pending' ? (
                  <button 
                    onClick={() => setSelectedAlert(alert)}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full rounded-xl bg-[#4F8EF7] text-white hover:bg-[#3b7ae0] transition-colors shadow-[0_0_15px_rgba(79,142,247,0.3)] font-medium text-sm"
                  >
                    <Search size={16} />
                    Find Match
                  </button>
                ) : (
                  <button disabled className="flex items-center justify-center gap-2 px-4 py-2 w-full rounded-xl bg-white/5 text-gray-400 border border-white/10 cursor-default font-medium text-sm">
                    <Check size={16} />
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side Panel Overlay & Drawer */}
      <AnimatePresence>
        {selectedAlert && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlert(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#161B33] border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-[Manrope] text-xl font-bold text-white flex items-center gap-2">
                    <Zap size={20} className="text-[#F59E0B]" />
                    Match Candidates
                  </h2>
                  <button 
                    onClick={() => setSelectedAlert(null)}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold text-[#4F8EF7] uppercase tracking-wider mb-1 block">Target Alert</span>
                    <span className="font-semibold text-white block">{selectedAlert.merchant}</span>
                    <span className="text-xs text-gray-400">{selectedAlert.bank} •••• {selectedAlert.cardLast4}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-[Manrope] text-lg font-bold text-white block">{formatCurrency(selectedAlert.amount)}</span>
                    <span className="text-xs text-gray-400">{selectedAlert.timestamp.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Drawer Body - Candidates List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <p className="text-sm text-gray-400 mb-4">Our ML model found these top potential matches in your billed statements.</p>
                
                <div className="flex flex-col gap-4">
                  {mockCandidates.map((candidate, index) => {
                    const isHighConfidence = candidate.confidence >= 80;
                    const isMedConfidence = candidate.confidence >= 40 && candidate.confidence < 80;
                    
                    return (
                      <div key={candidate.id} className="glass-card p-4 flex flex-col gap-3 relative overflow-hidden group hover:border-[#4F8EF7]/50 transition-colors">
                        {/* High Confidence highlight border */}
                        {index === 0 && <div className="absolute left-0 top-0 w-1 h-full bg-[#10B981]"></div>}

                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-white text-sm">{candidate.merchant}</h4>
                            <span className="text-xs text-gray-400">{candidate.date}</span>
                          </div>
                          
                          <div className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border ${
                            isHighConfidence ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 
                            isMedConfidence ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 
                            'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }`}>
                            <Zap size={10} className={isHighConfidence ? 'fill-current' : ''} />
                            {candidate.confidence}% Match
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                          <span className="font-[Manrope] font-bold text-white">{formatCurrency(candidate.amount)}</span>
                          
                          <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                            index === 0 
                              ? 'bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30' 
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}>
                            Confirm <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
