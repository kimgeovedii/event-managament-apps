import React from "react";
import { CampaignIcon, CopyIcon } from "./ReferralIcons";
import { ReferralStats } from "../types";

interface ReferralCrewCardProps {
  code: string;
  stats: ReferralStats;
  onCopyCode: () => void;
}

const ReferralCrewCard: React.FC<ReferralCrewCardProps> = ({ code, stats, onCopyCode }) => (
  <div className="relative bg-zinc-900/40 border-2 border-zinc-800 p-3 md:p-6 shadow-[2px_2px_0px_0px_#333333] md:shadow-[4px_4px_0px_0px_#333333] overflow-hidden h-full">
    {/* Background Effect */}
    <div className="absolute inset-0 bg-[#00FFFF]/5 pointer-events-none" />
    
    {/* Punch Holes */}
    <div className="absolute top-1/2 -translate-y-1/2 left-[-8px] md:left-[-10px] w-4 h-4 md:w-5 md:h-5 bg-black rounded-full border-2 border-zinc-800" />
    <div className="absolute top-1/2 -translate-y-1/2 right-[-8px] md:right-[-10px] w-4 h-4 md:w-5 md:h-5 bg-black rounded-full border-2 border-zinc-800" />
    
    {/* Dashed Line */}
    <div className="absolute top-1/2 left-0 w-full border-b-2 border-zinc-800 border-dashed opacity-50 pointer-events-none" />

    <div className="flex flex-col gap-3 md:gap-6 relative z-10 h-full justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 border-b-2 border-zinc-800 pb-2 md:pb-4 border-dashed">
        <div className="bg-[#00FFFF] text-black p-1.5 md:p-2 border-2 border-black shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff] transform -rotate-3">
          <CampaignIcon />
        </div>
        <h3 className="text-lg md:text-2xl font-black uppercase italic tracking-tighter text-white">Referral Crew</h3>
      </div>

      {/* Description */}
      <p className="font-bold text-xs md:text-sm leading-relaxed border-2 border-zinc-800 bg-black/60 p-2 md:p-3 shadow-[2px_2px_0px_0px_#00FFFF] md:shadow-[3px_3px_0px_0px_#00FFFF] text-gray-300">
        Share the hype! Friends get <span className="bg-[#FF00FF] text-white px-1">10% OFF</span> their first ticket. You get points.
      </p>

      {/* Referral Code */}
      <div className="bg-black border border-zinc-800 p-2 md:p-4 relative group hover:scale-[1.02] transition-transform duration-200">
        <label className="text-[9px] md:text-[10px] font-black text-[#00FFFF] uppercase mb-0.5 md:mb-1 block tracking-widest">Your Code</label>
        <div className="flex justify-between items-center gap-2">
          <span className="text-lg md:text-2xl font-black text-white tracking-widest font-mono truncate">{code}</span>
          <button 
            onClick={onCopyCode}
            className="bg-[#00FFFF] text-black size-8 md:size-10 shrink-0 flex items-center justify-center border-2 border-black hover:bg-white transition-colors"
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="bg-zinc-900 border-2 border-zinc-800 p-2 flex flex-col items-center justify-center text-center shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff]">
          <span className="text-xl md:text-3xl font-black text-white mb-0.5 md:mb-1">{stats.friends}</span>
          <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-wide">Friends</span>
        </div>
        <div className="bg-[#a855f7] border-2 border-black p-2 flex flex-col items-center justify-center text-center shadow-[1px_1px_0px_0px_#ffffff] md:shadow-[2px_2px_0px_0px_#ffffff]">
          <span className="text-xl md:text-3xl font-black text-white mb-0.5 md:mb-1">{stats.coupons}</span>
          <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-wide">Coupons</span>
        </div>
      </div>
    </div>
  </div>
);

export default ReferralCrewCard;
