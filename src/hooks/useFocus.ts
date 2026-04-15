import { useState, useMemo } from 'react';

export const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  const focusHandlers = useMemo(
    () => ({
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
    }),
    [],
  );

  return { isFocused, focusHandlers };
};
