import { NetWorthCard } from "./Overview/NetWorthCard";
import { NetCashflowCard, TopSpendingCard, InvestmentPulseCard } from "./Overview/BentoGridCards";
import { RecentActivityFeed } from "./Overview/RecentActivityFeed";
import { QuickActionsCard } from "./Overview/QuickActionsCard";

export function Overview() {
  return (
    <div className="grid grid-cols-12 gap-8 w-full max-w-[1600px] mx-auto pb-12">
      <NetWorthCard />
      
      {/* Middle Section Bento Grid */}
      <NetCashflowCard />
      <TopSpendingCard />
      <InvestmentPulseCard />
      
      {/* Bottom Section */}
      <RecentActivityFeed />
      <QuickActionsCard />
    </div>
  );
}
