'use client';
import {useEffect, useRef, useState} from 'react';
import {BlinkProvider, useBlink} from '@/contexts/BlinkContext';

const INK = '#111';

function Eye({size}: {size: number}) {
  const isBlinking = useBlink();
  const ref = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({x: 0, y: 0});

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!ref.current || isBlinking) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(size / 10, Math.hypot(dx, dy));
      setPupil({x: distance * Math.cos(angle), y: distance * Math.sin(angle)});
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [isBlinking, size]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-white"
      style={{
        width: size,
        height: size / 2,
        border: `${Math.max(2, size / 24)}px solid ${INK}`,
        borderRadius: `${size / 2}px / ${size / 4}px`,
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: size / 4,
          height: size / 4,
          background: INK,
          transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))`,
        }}
      />
      {/* Eyelid */}
      <div
        className="absolute inset-0 origin-top transition-transform duration-100 motion-reduce:transition-none"
        style={{background: INK, transform: `scaleY(${isBlinking ? 1 : 0})`}}
      />
    </div>
  );
}

export default function Eyes({size = 44}: {size?: number}) {
  return (
    <BlinkProvider>
      <div aria-hidden className="flex" style={{gap: size / 6}}>
        <Eye size={size} />
        <Eye size={size} />
      </div>
    </BlinkProvider>
  );
}
