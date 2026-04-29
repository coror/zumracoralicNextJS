'use client';
import {
  Children,
  ReactNode,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useInView } from 'react-intersection-observer';

type Variant = 'fade' | 'up' | 'up-lg' | 'down' | 'scale';

const variantClass: Record<Variant, string> = {
  fade: 'reveal-fade',
  up: 'reveal-up',
  'up-lg': 'reveal-up-lg',
  down: 'reveal-down',
  scale: 'reveal-scale',
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  once?: boolean;
}

/**
 * Reveal wrapper:
 *  - In modern browsers (Chrome/Edge 115+): scroll-linked CSS animation via
 *    `animation-timeline: view()`. Animation progress follows scroll position
 *    perfectly — never out of sync with what the user is looking at.
 *  - In older browsers (Safari, Firefox): IntersectionObserver triggers
 *    `.in-view` which runs a CSS transition. Same look, slightly different
 *    timing model.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  once = true,
}: RevealProps) {
  const [supportsTimeline, setSupportsTimeline] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof CSS !== 'undefined' &&
      CSS.supports?.('animation-timeline', 'view()')
    ) {
      setSupportsTimeline(true);
    }
  }, []);

  // Only attach the observer when scroll-timeline isn't supported
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0,
    skip: supportsTimeline,
  });

  const classes = [
    'reveal-base',
    variantClass[variant],
    !supportsTimeline && inView ? 'in-view' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={delay ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  startDelay?: number;
  variant?: Variant;
  once?: boolean;
}

/**
 * Cascading reveal for child lists. Each child gets its own animation/transition
 * delay so items appear one after another.
 *
 * Note: in scroll-linked mode, animation-delay is interpreted against the scroll
 * timeline, not wall-clock time — items further down the list animate at slightly
 * later scroll positions, which produces a similar cascading feel.
 */
export function RevealStagger({
  children,
  className = '',
  gap = 80,
  startDelay = 0,
  variant = 'up',
  once = true,
}: RevealStaggerProps) {
  const arr = Children.toArray(children).filter(isValidElement);
  return (
    <div className={className}>
      {arr.map((child, i) => (
        <Reveal
          key={i}
          variant={variant}
          delay={startDelay + i * gap}
          once={once}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
