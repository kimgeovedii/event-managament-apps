import React from "react";
import { Coupon } from "../types";

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => (
  <div className={`relative ${coupon.isRedeemed ? 'bg-zinc-900/50 opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : 'bg-zinc-900 shadow-[2px_2px_0px_0px_#FF00FF] md:shadow-[4px_4px_0px_0px_#FF00FF] hover:-translate-y-1'} border-2 ${coupon.isRedeemed ? 'border-zinc-800' : 'border-zinc-700'} p-0 transition-all`}>
    {/* Punch Holes */}
    <div className={`absolute -left-[5px] md:-left-[6px] top-1/2 -translate-y-1/2 w-2.5 h-5 md:w-3 md:h-6 bg-black border-r-2 ${coupon.isRedeemed ? 'border-zinc-800' : 'border-zinc-700'} rounded-r-full`} />
    <div className={`absolute -right-[5px] md:-right-[6px] top-1/2 -translate-y-1/2 w-2.5 h-5 md:w-3 md:h-6 bg-black border-l-2 ${coupon.isRedeemed ? 'border-zinc-800' : 'border-zinc-700'} rounded-l-full`} />

    {coupon.isRedeemed ? (
      <div className="p-3 md:p-4 flex justify-between items-center relative z-10">
        <div>
          <p className="font-black text-xl md:text-2xl text-gray-500">{coupon.discount}</p>
          <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">{coupon.description}</p>
        </div>
        <span className="text-[10px] md:text-xs font-black text-gray-500 border-2 border-zinc-800 px-1.5 md:px-2 py-0.5 md:py-1 uppercase transform rotate-12">Redeemed</span>
      </div>
    ) : (
      <>
        <div className="p-3 md:p-4 flex justify-between items-center border-b-2 border-zinc-700 border-dashed bg-[#FF00FF]/10">
          <div>
            <p className="font-black text-2xl md:text-3xl text-[#FF00FF] italic drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">{coupon.discount}</p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-300">{coupon.description}</p>
          </div>
        </div>
        <div className="p-2 md:p-3 bg-zinc-900 flex justify-end">
          <button className="bg-white text-black px-3 md:px-4 py-0.5 md:py-1 text-[10px] md:text-xs font-black uppercase hover:bg-[#FF00FF] hover:text-white transition-colors">
            Use Now
          </button>
        </div>
      </>
    )}
  </div>
);

export default CouponCard;
