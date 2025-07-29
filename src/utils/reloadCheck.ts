export const isPageReloaded = (): boolean => {
  if (typeof window === "undefined" || !window.history.state) {
    return false;
  }

  return Object.keys(window.history.state).length <= 1;
};
