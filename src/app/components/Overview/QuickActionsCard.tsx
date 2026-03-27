import { motion } from "motion/react";
import { Mail, RefreshCw, Layers, Camera } from "lucide-react";

export function QuickActionsCard() {
  const actions = [
    { name: "Process Emails", icon: Mail, color: "text-[#4F8EF7]", bg: "bg-[#4F8EF7]/10 hover:bg-[#4F8EF7]/20 border-[#4F8EF7]/20 hover:border-[#4F8EF7]/40" },
    { name: "Refresh Portfolio", icon: RefreshCw, color: "text-[#10B981]", bg: "bg-[#10B981]/10 hover:bg-[#10B981]/20 border-[#10B981]/20 hover:border-[#10B981]/40" },
    { name: "Update NAV", icon: Layers, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 border-[#F59E0B]/20 hover:border-[#F59E0B]/40" },
    { name: "Capture Snapshot", icon: Camera, color: "text-[#EF4444]", bg: "bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border-[#EF4444]/20 hover:border-[#EF4444]/40" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
      className="col-span-12 lg:col-span-4 glass-card p-6 h-full flex flex-col justify-between"
    >
      <div className="mb-6">
        <h3 className="font-[Manrope] text-xl font-bold text-white">Quick Actions</h3>
        <p className="text-sm text-gray-400">Manage operations quickly</p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {actions.map((action, i) => (
          <button 
            key={i} 
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group ${action.bg}`}
          >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${action.color}`}>
              <action.icon size={24} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium text-white text-center leading-tight">{action.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
