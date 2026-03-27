import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ArrowRightLeft, 
  ArrowDownRight, 
  ArrowUpRight,
  ChevronDown,
  Download
} from "lucide-react";

type TxnType = 'credit' | 'debit' | 'transfer';

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  subCategory: string;
  account: string;
  type: TxnType;
  amount: number;
  status: 'Billed' | 'Unbilled' | 'Pending';
}

const mockTransactions: Transaction[] = [
  { id: 'TXN-001', date: '2023-10-24', merchant: 'Amazon India', category: 'Shopping', subCategory: 'Electronics', account: 'Amazon Pay ICICI', type: 'debit', amount: 4500, status: 'Unbilled' },
  { id: 'TXN-002', date: '2023-10-23', merchant: 'TechCorp Salary', category: 'Income', subCategory: 'Salary', account: 'ICICI Savings', type: 'credit', amount: 125000, status: 'Billed' },
  { id: 'TXN-003', date: '2023-10-22', merchant: 'Self Transfer', category: 'Transfer', subCategory: 'Savings', account: 'ICICI Savings → IDFC', type: 'transfer', amount: 20000, status: 'Billed' },
  { id: 'TXN-004', date: '2023-10-21', merchant: 'Uber Rides', category: 'Transport', subCategory: 'Cab', account: 'AMEX Platinum', type: 'debit', amount: 450, status: 'Unbilled' },
  { id: 'TXN-005', date: '2023-10-20', merchant: 'Netflix', category: 'Entertainment', subCategory: 'Subscription', account: 'Amazon Pay ICICI', type: 'debit', amount: 649, status: 'Billed' },
  { id: 'TXN-006', date: '2023-10-19', merchant: 'Refund: Myntra', category: 'Shopping', subCategory: 'Refund', account: 'ICICI Emerald', type: 'credit', amount: 1299, status: 'Billed' },
  { id: 'TXN-007', date: '2023-10-18', merchant: 'Starbucks', category: 'Dining', subCategory: 'Coffee', account: 'ICICI Emerald', type: 'debit', amount: 850, status: 'Billed' },
  { id: 'TXN-008', date: '2023-10-17', merchant: 'Mutual Fund SIP', category: 'Investment', subCategory: 'Equity', account: 'IDFC Savings', type: 'debit', amount: 15000, status: 'Billed' },
  { id: 'TXN-009', date: '2023-10-15', merchant: 'CC Bill Payment', category: 'Transfer', subCategory: 'Credit Card', account: 'ICICI Savings → AMEX', type: 'transfer', amount: 35000, status: 'Billed' },
  { id: 'TXN-010', date: '2023-10-14', merchant: 'Zomato', category: 'Dining', subCategory: 'Delivery', account: 'Amazon Pay ICICI', type: 'debit', amount: 1240, status: 'Billed' },
  { id: 'TXN-011', date: '2023-10-12', merchant: 'Indigo Airlines', category: 'Travel', subCategory: 'Flights', account: 'AMEX Platinum', type: 'debit', amount: 12500, status: 'Billed' },
  { id: 'TXN-012', date: '2023-10-10', merchant: 'Freelance Client', category: 'Income', subCategory: 'Consulting', account: 'IDFC Savings', type: 'credit', amount: 45000, status: 'Billed' },
];

export function AllTransactions() {
  const [selectedTxns, setSelectedTxns] = useState<Set<string>>(new Set());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTxns(new Set(mockTransactions.map(t => t.id)));
    } else {
      setSelectedTxns(new Set());
    }
  };

  const toggleTxn = (id: string) => {
    const newSet = new Set(selectedTxns);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedTxns(newSet);
  };

  const getRowStyle = (type: TxnType) => {
    switch (type) {
      case 'credit': return 'bg-[#10B981]/5 hover:bg-[#10B981]/10 border-l-2 border-l-[#10B981]';
      case 'transfer': return 'bg-[#F59E0B]/5 hover:bg-[#F59E0B]/10 border-l-2 border-l-[#F59E0B]';
      default: return 'bg-transparent hover:bg-white/5 border-l-2 border-l-transparent';
    }
  };

  const getTypeIcon = (type: TxnType) => {
    switch (type) {
      case 'credit': return <ArrowDownRight size={16} className="text-[#10B981]" />;
      case 'debit': return <ArrowUpRight size={16} className="text-gray-400" />;
      case 'transfer': return <ArrowRightLeft size={16} className="text-[#F59E0B]" />;
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 flex flex-col h-[calc(100vh-140px)] gap-6">
      
      {/* Top Section: Search Bar & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search transactions by merchant, category, or amount..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#4F8EF7]/50 focus:ring-1 focus:ring-[#4F8EF7]/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors font-medium text-sm">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F8EF7] text-white hover:bg-[#3b7ae0] transition-colors shadow-[0_0_15px_rgba(79,142,247,0.3)] font-medium text-sm">
            <span>+</span> Add Manual
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Left Side: Advanced Filters */}
        <aside className="w-72 flex-shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-[Manrope] font-bold text-white flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#4F8EF7]" />
                Filters
              </h3>
              <button className="text-xs text-gray-400 hover:text-white">Clear All</button>
            </div>

            <div className="space-y-6">
              {/* Account Type */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Account Type</label>
                <div className="space-y-2">
                  {['Bank Accounts', 'Credit Cards', 'Wallets'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-white/40 transition-colors">
                        <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer" />
                        {/* Fake checkmark for styling would go here */}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transaction Type */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Transaction Type</label>
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                  {['All', 'Credit', 'Debit'].map(type => (
                    <button key={type} className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${type === 'All' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Account */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Account</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#4F8EF7]/50 cursor-pointer">
                    <option className="bg-[#1A1F3A]">All Accounts</option>
                    <option className="bg-[#1A1F3A]">ICICI Savings</option>
                    <option className="bg-[#1A1F3A]">Amazon Pay ICICI</option>
                    <option className="bg-[#1A1F3A]">AMEX Platinum</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Category</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#4F8EF7]/50 cursor-pointer">
                    <option className="bg-[#1A1F3A]">All Categories</option>
                    <option className="bg-[#1A1F3A]">Shopping</option>
                    <option className="bg-[#1A1F3A]">Dining</option>
                    <option className="bg-[#1A1F3A]">Travel</option>
                    <option className="bg-[#1A1F3A]">Bills & Utilities</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Amount Range</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none" />
                  <span className="text-gray-500">-</span>
                  <input type="number" placeholder="Max" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none" />
                </div>
              </div>

              {/* Billing Status */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Billing Status</label>
                <div className="space-y-2">
                  {['Billed', 'Unbilled', 'Pending'].map(status => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-white/40 transition-colors">
                        <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Data Table */}
        <div className="flex-1 glass-card flex flex-col overflow-hidden relative">
          
          {/* Table Actions Bar (Visible when rows selected) */}
          {selectedTxns.size > 0 && (
            <div className="absolute top-0 left-0 w-full bg-[#4F8EF7]/10 backdrop-blur-md border-b border-[#4F8EF7]/30 px-6 py-3 flex items-center justify-between z-20 transition-all">
              <span className="text-sm font-medium text-white">{selectedTxns.size} transactions selected</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors">Edit Category</button>
                <button className="px-3 py-1.5 rounded-lg bg-[#EF4444]/20 text-[#EF4444] text-xs font-medium hover:bg-[#EF4444]/30 transition-colors">Delete</button>
              </div>
            </div>
          )}

          {/* Table Header */}
          <div className="grid grid-cols-[40px_100px_minmax(200px,_1fr)_120px_120px_140px_80px_100px_60px] gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] text-xs font-semibold text-gray-400 uppercase tracking-wider sticky top-0 z-10">
            <div className="flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={selectedTxns.size === mockTransactions.length && mockTransactions.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#4F8EF7] focus:ring-[#4F8EF7] cursor-pointer" 
              />
            </div>
            <div>Date</div>
            <div>Merchant / Particulars</div>
            <div>Category</div>
            <div>Sub-category</div>
            <div>Account</div>
            <div>Type</div>
            <div className="text-right">Amount</div>
            <div className="text-center">Action</div>
          </div>

          {/* Table Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pb-4">
            {mockTransactions.map((txn) => (
              <div 
                key={txn.id} 
                className={`grid grid-cols-[40px_100px_minmax(200px,_1fr)_120px_120px_140px_80px_100px_60px] gap-4 px-6 py-3 items-center border-b border-white/5 transition-colors group ${getRowStyle(txn.type)}`}
              >
                {/* Checkbox */}
                <div className="flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectedTxns.has(txn.id)}
                    onChange={() => toggleTxn(txn.id)}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#4F8EF7] focus:ring-[#4F8EF7] cursor-pointer" 
                  />
                </div>
                
                {/* Date */}
                <div className="text-sm text-gray-400 font-medium">
                  {new Date(txn.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </div>
                
                {/* Merchant */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white truncate">{txn.merchant}</span>
                  {txn.status === 'Unbilled' && <span className="text-[10px] text-[#F59E0B] font-medium mt-0.5">Unbilled</span>}
                </div>
                
                {/* Category */}
                <div>
                  <span className="inline-flex items-center px-2 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/5 truncate max-w-full">
                    {txn.category}
                  </span>
                </div>
                
                {/* Sub-category */}
                <div className="text-sm text-gray-400 truncate">
                  {txn.subCategory}
                </div>
                
                {/* Account */}
                <div className="text-sm text-gray-400 truncate">
                  {txn.account}
                </div>
                
                {/* Type Icon */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full ${txn.type === 'credit' ? 'bg-[#10B981]/10' : txn.type === 'transfer' ? 'bg-[#F59E0B]/10' : 'bg-gray-500/10'}`}>
                    {getTypeIcon(txn.type)}
                  </div>
                </div>
                
                {/* Amount */}
                <div className={`text-right font-[Manrope] text-sm font-bold ${txn.type === 'credit' ? 'text-[#10B981]' : txn.type === 'transfer' ? 'text-[#F59E0B]' : 'text-white'}`}>
                  {txn.type === 'credit' ? '+' : txn.type === 'debit' ? '-' : ''}{formatCurrency(txn.amount)}
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
