export const stop =
  (fn: () => unknown) => (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    fn();
  };

export const prevent =
  (fn: () => unknown) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fn();
  };
