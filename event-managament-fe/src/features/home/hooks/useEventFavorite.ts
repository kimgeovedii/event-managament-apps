"use client";

import React from "react";

interface UseEventFavoriteReturn {
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export const useEventFavorite = (initialValue = false): UseEventFavoriteReturn => {
  const [isFavorite, setIsFavorite] = React.useState(initialValue);

  const toggleFavorite = React.useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useEventFavorite;
