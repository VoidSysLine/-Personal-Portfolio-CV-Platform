import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface HeroBackgroundProps {
  variant?: 'dotGrid' | 'gradientMesh';
  className?: string;
}

export function HeroBackground({ variant = 'dotGrid', className }: HeroBackgroundProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    if (variant === 'dotGrid') {
      const spacing = 30;
      let time = 0;

      const draw = () => {
        ctx.clearRect(0, 0, width(), height());
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const dotColor = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(15, 23, 42, 0.08)';

        for (let x = spacing; x < width(); x += spacing) {
          for (let y = spacing; y < height(); y += spacing) {
            const offsetX = prefersReducedMotion ? 0 : Math.sin(time * 0.5 + x * 0.01 + y * 0.01) * 2;
            const offsetY = prefersReducedMotion ? 0 : Math.cos(time * 0.3 + x * 0.01) * 2;

            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
            ctx.fill();
          }
        }

        if (!prefersReducedMotion) {
          time += 0.016;
          animationRef.current = requestAnimationFrame(draw);
        }
      };

      draw();
    } else {
      const draw = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const gradient = ctx.createRadialGradient(
          width() * 0.3, height() * 0.4, 0,
          width() * 0.3, height() * 0.4, width() * 0.5
        );

        if (isDark) {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
          gradient.addColorStop(1, 'transparent');
        } else {
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.05)');
          gradient.addColorStop(1, 'transparent');
        }

        ctx.clearRect(0, 0, width(), height());
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width(), height());

        const gradient2 = ctx.createRadialGradient(
          width() * 0.7, height() * 0.6, 0,
          width() * 0.7, height() * 0.6, width() * 0.4
        );

        if (isDark) {
          gradient2.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
          gradient2.addColorStop(1, 'transparent');
        } else {
          gradient2.addColorStop(0, 'rgba(37, 99, 235, 0.03)');
          gradient2.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width(), height());
      };

      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 z-0 h-full w-full', className)}
      aria-hidden="true"
    />
  );
}
