"use client";

import React from "react";

interface UseFilterBarReturn {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedPrice: string;
  setSelectedPrice: (price: string) => void;
}

export const useFilterBar = (defaultFilter = "all"): UseFilterBarReturn => {
  const [activeFilter, setActiveFilter] = React.useState(defaultFilter);
  const [selectedLocation, setSelectedLocation] = React.useState("Jakarta");
  const [selectedPrice, setSelectedPrice] = React.useState("$$$ Any");

  return {
    activeFilter,
    setActiveFilter,
    selectedLocation,
    setSelectedLocation,
    selectedPrice,
    setSelectedPrice,
  };
};

export default useFilterBar;
