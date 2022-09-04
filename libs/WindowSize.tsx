import { useEffect, useState } from "react";

const WindowSize = () => {
  const [windowSize, setWindowSize] = useState(0);

  const handleWindowSize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, [windowSize]);

  useEffect(() => {
    setWindowSize(innerWidth);
  }, []);

  return {
    windowSize,
  };
};

export default WindowSize;
