import { motion } from "motion/react";
import { Coffee, ShoppingBag, Car, Home, Zap, CreditCard, Apple, MonitorSmartphone, Utensils } from "lucide-react";

const transactions = [
  { id: 1, merchant: "Starbucks", category: "Food & Dining", amount: -15.50, card: "Sapphire Reserve", date: "Today", icon: Coffee, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
  { id: 2, merchant: "Apple Store", category: "Electronics", amount: -1299.00, card: "Amex Platinum", date: "Today", icon: Apple, color: "text-[#EF4444]", bg: "bg-[#EF4444]/10" },
  { id: 3, merchant: "Uber", category: "Transportation", amount: -32.40, card: "Sapphire Reserve", date: "Yesterday", icon: Car, color: "text-[#4F8EF7]", bg: "bg-[#4F8EF7]/10" },
  { id: 4, merchant: "Whole Foods", category: "Groceries", amount: -145.20, card: "Amex Gold", date: "Yesterday", icon: ShoppingBag, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
  { id: 5, merchant: "PG&E Utility", category: "Bills & Utilities", amount: -210.00, card: "Bank Account", date: "Mar 25", icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10" },
  { id: 6, merchant: "Salary Deposit", category: "Income", amount: 7250.00, card: "Bank Account", date: "Mar 24", icon: MonitorSmartphone, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
  { id: 7, merchant: "Sweetgreen", category: "Food & Dining", amount: -24.50, card: "Amex Gold", date: "Mar 23", icon: Utensils, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
];

export function RecentActivityFeed() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
      className="col-span-12 lg:col-span-8 glass-card p-6 h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-[Manrope] text-xl font-bold text-white">Recent Activity</h3>
          <p className="text-sm text-gray-400">Latest transactions</p>
        </div>
        <button className="text-[#4F8EF7] text-sm font-medium hover:underline">View All</button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider sticky top-0 bg-[#1A1F3A]/90 backdrop-blur z-10">
              <th className="pb-3 font-medium">Merchant</th>
              <th className="pb-3 font-medium hidden md:table-cell">Category</th>
              <th className="pb-3 font-medium hidden sm:table-cell">Account</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.bg} ${tx.color}`}>
                      <tx.icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{tx.merchant}</p>
                      <p className="text-xs text-gray-400 md:hidden">{tx.category} • {tx.date}</p>
                      <p className="text-xs text-gray-400 hidden md:block">{tx.date}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    {tx.category}
                  </span>
                </td>
                <td className="py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CreditCard size={14} className="opacity-50" />
                    {tx.card}
                  </div>
                </td>
                <td className="py-4 text-right">
                  <p className={`font-[Manrope] font-bold ${tx.amount > 0 ? "text-[#10B981]" : "text-white"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
