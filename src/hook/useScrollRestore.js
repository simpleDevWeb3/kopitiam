import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollRestore() {
  const location = useLocation();

  useLayoutEffect(() => {
    function handleRestoreScroll() {
      window.scrollTo(0, 0);
    }

    handleRestoreScroll();
  }, [location.pathname]);
}

export { useScrollRestore };
