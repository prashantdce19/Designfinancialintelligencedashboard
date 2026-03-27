import { Outlet, NavLink, useLocation } from "react-router";
import { 
  Home, 
  Landmark, 
  CreditCard, 
  LayoutDashboard, 
  ListOrdered, 
  BellRing, 
  Briefcase, 
  LineChart, 
  TrendingUp, 
  Settings,
  Bell,
  Search
} from "lucide-react";
import { Avatar, IconButton, Badge } from "@mui/material";

export function Layout() {
  const navItems = [
    { name: "Overview", path: "/", icon: <Home size={20} /> },
    { name: "Bank Accounts", path: "/banks", icon: <Landmark size={20} /> },
    { name: "Credit Cards", path: "/cards", icon: <CreditCard size={20} /> },
    { name: "Combined View", path: "/combined", icon: <LayoutDashboard size={20} /> },
    { name: "All Transactions", path: "/transactions", icon: <ListOrdered size={20} /> },
    { name: "Unbilled Alerts", path: "/alerts", icon: <BellRing size={20} /> },
    { name: "Portfolio", path: "/portfolio", icon: <Briefcase size={20} /> },
    { name: "Charts & Insights", path: "/charts", icon: <LineChart size={20} /> },
    { name: "MF Analysis", path: "/mf-analysis", icon: <TrendingUp size={20} /> },
    { name: "Operations", path: "/ops", icon: <Settings size={20} /> },
  ];

  const location = useLocation();
  
  const getPageTitle = () => {
    // Exact match for nested paths could be an issue if there are query strings, but path comparison is fine for basic use.
    const currentRoute = navItems.find(item => item.path === location.pathname);
    return currentRoute ? currentRoute.name : "Overview";
  };

  return (
    <div className="flex h-screen w-full bg-[#1A1F3A] text-white font-[Inter] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#4F8EF7] flex items-center justify-center shadow-[0_0_15px_rgba(79,142,247,0.5)]">
            <span className="font-[Manrope] font-bold text-white text-lg">F</span>
          </div>
          <span className="font-[Manrope] text-xl font-bold tracking-tight">FinQ</span>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-white/10 text-white font-medium shadow-[inset_0_1px_rgba(255,255,255,0.1)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`${isActive ? "text-[#4F8EF7]" : ""}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-[#4F8EF7]/20 to-transparent border border-[#4F8EF7]/20 relative overflow-hidden group cursor-pointer hover:border-[#4F8EF7]/40 transition-colors">
          <div className="relative z-10">
            <p className="text-xs text-[#4F8EF7] font-semibold mb-1 uppercase tracking-wider">Pro Plan</p>
            <p className="text-sm font-medium">Upgrade to Platinum</p>
          </div>
          <div className="absolute right-[-10px] bottom-[-10px] opacity-20 transform group-hover:scale-110 transition-transform">
            <Settings size={64} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#1A1F3A]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <h1 className="font-[Manrope] text-2xl font-bold">{getPageTitle()}</h1>
            <div className="hidden md:flex bg-white/5 border border-white/10 p-1 rounded-xl">
              {['7D', '30D', '90D', '1Y'].map((period) => (
                <button 
                  key={period} 
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${period === '30D' ? 'bg-[#4F8EF7] text-white shadow-[0_0_10px_rgba(79,142,247,0.3)]' : 'text-gray-400 hover:text-white'}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative group cursor-pointer">
              <Search className="text-gray-400 group-hover:text-white transition-colors" size={20} />
            </div>
            <IconButton size="small" className="text-gray-400 hover:text-white transition-colors">
              <Badge variant="dot" color="error" overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Bell size={20} />
              </Badge>
            </IconButton>
            <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white leading-none">Alex Morgan</p>
                <p className="text-xs text-gray-400 mt-1">alex@premium.io</p>
              </div>
              <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
                className="border border-white/20 shadow-md"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {/* Subtle background glow effect */}
          <div className="fixed top-20 right-[10%] w-[500px] h-[500px] bg-[#4F8EF7]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="fixed bottom-[-100px] left-[20%] w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
