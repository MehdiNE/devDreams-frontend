"use client";

import { useCallback, useRef, useEffect } from "react";

const useRipple = (duration = 500) => {
  const rippleRef = useRef<HTMLSpanElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        background-color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const button = event.currentTarget;

      // Add necessary styles to the button
      const originalPosition = button.style.position;
      const originalOverflow = button.style.overflow;
      button.style.position = "relative";
      button.style.overflow = "hidden";

      if (rippleRef.current) {
        rippleRef.current.remove();
      }

      const ripple = document.createElement("span");
      rippleRef.current = ripple;

      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      const rect = button.getBoundingClientRect();
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${event.clientX - rect.left - radius}px`;
      ripple.style.top = `${event.clientY - rect.top - radius}px`;
      ripple.className = "ripple";

      button.appendChild(ripple);

      // Cancel any ongoing animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      // Start of animation
      let start: number | null = null;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ratio = Math.min(progress / duration, 1);

        ripple.style.transform = `scale(${2 * ratio})`;
        ripple.style.opacity = `${1 - ratio}`;

        if (progress < duration) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete
          ripple.remove();
          rippleRef.current = null;
          animationRef.current = null;
          // Restore original styles
          button.style.position = originalPosition;
          button.style.overflow = originalOverflow;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [duration],
  );

  return createRipple;
};

export default useRipple;
