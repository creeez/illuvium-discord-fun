import { useState, useEffect, useLayoutEffect } from "react";

const MOBILE_STOP = 1024;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function useDeviceDetect() {
  const [width, height] = useWindowSize();
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || "";
    const mobile = Boolean(
      width < MOBILE_STOP ||
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
    );
    setMobile(mobile);
  }, [width, height]);

  return { isMobile };
}
