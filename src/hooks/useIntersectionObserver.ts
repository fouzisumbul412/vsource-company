import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom hook that observes when an element enters the viewport
 * @param elementRef - React ref object for the element to observe
 * @param options - IntersectionObserver options
 * @returns boolean indicating if the element is in view
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
}

export default useIntersectionObserver; 