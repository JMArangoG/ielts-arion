import { useState, useEffect } from 'react';

export const useFocusMode = () => {
  const [isFocusMode, setFocusMode] = useState(false);

  const toggleFocusMode = () => setFocusMode(prev => !prev);
  const enableFocusMode = () => setFocusMode(true);
  const disableFocusMode = () => setFocusMode(false);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }

    return () => {
      document.body.classList.remove('focus-mode');
    };
  }, [isFocusMode]);

  return { isFocusMode, toggleFocusMode, enableFocusMode, disableFocusMode };
};