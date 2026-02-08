"use client";

import React from "react";
import { Transaction } from "../types";

// Icons
const FilterIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

const statusStyles = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  refunded: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

interface TransactionsTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, loading = false }) => {
  return (
    <div className="bg-white dark:bg-[#221019] rounded-[24px] md:rounded-[32px] border border-[#f4f0f2] dark:border-[#3a1d2e] shadow-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b border-[#f4f0f2] dark:border-[#3a1d2e] flex items-center justify-between">
        <h3 className="text-base md:text-lg font-bold text-[#181114] dark:text-white">Recent Transactions</h3>
        <div className="flex gap-1.5 md:gap-2">
          <button className="size-7 md:size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a1621] transition-colors text-[#5f4351]">
            <FilterIcon />
          </button>
          <button className="size-7 md:size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a1621] transition-colors text-[#5f4351]">
            <DownloadIcon />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm text-left">
          <thead className="text-[10px] md:text-xs text-[#896175] uppercase bg-[#fcfbfc] dark:bg-[#2a1621] font-bold">
            <tr>
              <th className="px-3 md:px-6 py-3 md:py-4">Transaction ID</th>
              <th className="px-3 md:px-6 py-3 md:py-4">Customer</th>
              <th className="px-3 md:px-6 py-3 md:py-4 hidden md:table-cell">Event</th>
              <th className="px-3 md:px-6 py-3 md:py-4 hidden lg:table-cell">Date</th>
              <th className="px-3 md:px-6 py-3 md:py-4">Amount</th>
              <th className="px-3 md:px-6 py-3 md:py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f4f0f2] dark:divide-[#3a1d2e]">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 md:px-6 py-3 md:py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" /></td>
                  <td className="px-3 md:px-6 py-3 md:py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" /></td>
                  <td className="px-3 md:px-6 py-3 md:py-4 hidden md:table-cell"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" /></td>
                  <td className="px-3 md:px-6 py-3 md:py-4 hidden lg:table-cell"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" /></td>
                  <td className="px-3 md:px-6 py-3 md:py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" /></td>
                  <td className="px-3 md:px-6 py-3 md:py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" /></td>
                </tr>
              ))
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="bg-white dark:bg-[#221019] hover:bg-[#f8f6f7] dark:hover:bg-[#2a1621] transition-colors"
                >
                  <td className="px-3 md:px-6 py-3 md:py-4 font-medium text-[#181114] dark:text-white whitespace-nowrap text-[10px] md:text-sm">
                    {tx.id}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      {tx.customer.avatar ? (
                        <img
                          src={tx.customer.avatar}
                          alt={tx.customer.name}
                          className="size-6 md:size-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`size-6 md:size-8 rounded-full ${tx.customer.color} flex items-center justify-center text-[9px] md:text-xs font-bold`}>
                          {tx.customer.initials}
                        </div>
                      )}
                      <span className="font-medium text-[#181114] dark:text-white whitespace-nowrap text-[10px] md:text-sm">{tx.customer.name}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-[#5f4351] dark:text-gray-300 hidden md:table-cell">
                    {tx.event}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-[#5f4351] dark:text-gray-400 hidden lg:table-cell whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 font-bold text-[#181114] dark:text-white whitespace-nowrap text-[10px] md:text-sm">
                    {tx.amount}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span className={`inline-flex items-center px-1.5 md:px-2.5 py-0.5 rounded-full text-[9px] md:text-xs font-medium capitalize ${statusStyles[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
