"use client";

import * as React from "react";

const TYPEAHEAD_TIMEOUT = 500;

interface UseTypeaheadParams {
  items: string[];
  onMatch: (index: number) => void;
  enabled?: boolean;
}

export function useTypeahead({
  items,
  onMatch,
  enabled = true,
}: UseTypeaheadParams) {
  const searchRef = React.useRef("");
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onMatchRef = React.useRef(onMatch);
  onMatchRef.current = onMatch;

  const handleTypeahead = React.useCallback(
    (key: string) => {
      if (!enabled || key.length !== 1) return;

      // Accumulate search string
      searchRef.current += key.toLowerCase();

      // Clear previous timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Find matching item
      const search = searchRef.current;
      const matchIndex = items.findIndex((item) =>
        item.toLowerCase().startsWith(search)
      );

      if (matchIndex !== -1) {
        onMatchRef.current(matchIndex);
      }

      // Reset search after timeout
      timerRef.current = setTimeout(() => {
        searchRef.current = "";
      }, TYPEAHEAD_TIMEOUT);
    },
    [items, enabled]
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { handleTypeahead };
}
