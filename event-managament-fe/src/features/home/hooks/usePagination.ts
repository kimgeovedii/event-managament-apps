"use client";

import React from "react";

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export const usePagination = (totalPages = 26, initialPage = 1): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  const goToPage = React.useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = React.useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = React.useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export default usePagination;
