import { Wallet, LineChart, ArrowUpRight, Lightbulb } from "lucide-react";

interface PhoneNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  dark?: boolean;
}

const tabs = [
  { id: "portfolio", label: "Portfolio", icon: Wallet },
  { id: "invest", label: "Invest", icon: LineChart },
  { id: "transfer", label: "Transfer", icon: ArrowUpRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

const PhoneNavBar = ({ activeTab, onTabChange, dark = false }: PhoneNavBarProps) => {
  return (
    <div
      className={`flex justify-between px-4 pb-5 pt-3 border-t relative z-[9999] cursor-pointer ${
        dark ? "border-gray-800 bg-gray-900/90" : "border-gray-100 bg-white/90"
      } backdrop-blur-md`}
    >
      {tabs.map((btn) => {
        const Icon = btn.icon;
        const isActive = activeTab === btn.id;
        return (
          <button
            key={btn.id}
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onTabChange(btn.id);
            }}
            className={`flex flex-col items-center gap-1 min-w-[50px] transition-colors ${
              isActive
                ? dark
                  ? "text-emerald-400"
                  : "text-emerald-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[9px] font-medium">{btn.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PhoneNavBar;
