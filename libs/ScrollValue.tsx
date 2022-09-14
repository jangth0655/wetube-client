import { useCallback, useEffect, useState } from "react";

const ScrollValue = () => {
  const [value, setValue] = useState(0);

  const handleScroll = () => {
    setValue(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*   useEffect(() => {
    setValue(innerWidth);
  }, []); */

  return {
    getScrollY: value,
  };
};

export default ScrollValue;
