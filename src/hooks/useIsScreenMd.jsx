import { useState, useEffect } from "react";

function useIsScreenMd() {
  const [isScreenMd, setIsScreenMd] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsScreenMd(window.innerWidth >= 768);
    };

    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Initial check in case the screen size changes on load
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isScreenMd;
}

export default useIsScreenMd;
