import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface FancyProgressProps {
  value?: number;
  max?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  autoAnimate?: boolean;
  variant?: 'gradient' | 'glow' | 'steps' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

export default function FancyProgress({
  value = 0,
  max = 100,
  showPercentage = true,
  showLabel = true,
  label = 'Progress',
  autoAnimate = false,
  variant = 'gradient',
  size = 'md',
}: FancyProgressProps) {
  const [progress, setProgress] = useState(value);

  // Auto animation effect
  useEffect(() => {
    if (!autoAnimate) {
      setProgress(value);
      return;
    }

    // Animate to the target value
    let start: number | null = null;
    const animationDuration = 1500; // ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / animationDuration, 1);

      setProgress(value * progress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, autoAnimate]);

  // Calculate percentage
  const percentage = Math.round((progress / max) * 100);
  const isComplete = percentage >= 100;

  // Size classes
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500';
      case 'glow':
        return 'bg-primary shadow-[0_0_10px_rgba(147,51,234,0.7)]';
      case 'steps':
        return 'bg-primary [transition:width_0.2s_steps(20)]';
      case 'minimal':
        return 'bg-primary';
      default:
        return 'bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500';
    }
  };

  return (
    <div className='w-full space-y-2'>
      {showLabel && (
        <div className='flex justify-between items-center'>
          <label className='text-sm font-medium'>{label}</label>
          {showPercentage && (
            <div className='flex items-center gap-1 text-sm font-medium'>
              {isComplete ? (
                <span className='flex items-center gap-1 text-green-500'>
                  Complete <Check className='w-4 h-4' />
                </span>
              ) : (
                <span>{percentage}%</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className='relative w-full'>
        <div className={`w-full ${sizeClasses[size]} bg-muted rounded-full overflow-hidden`}>
          <div
            className={`${sizeClasses[size]} rounded-full ${getVariantClasses()} transition-all duration-300 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {variant === 'steps' && (
          <div className='absolute top-0 left-0 w-full flex justify-between px-[1px]'>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-px h-${sizeClasses[size]} bg-background opacity-30`}
                style={{ height: sizeClasses[size] === 'h-2' ? '8px' : sizeClasses[size] === 'h-3' ? '12px' : '16px' }}
              />
            ))}
          </div>
        )}

        {isComplete && variant === 'gradient' && (
          <div className='absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-white dark:bg-black rounded-full p-0.5 shadow-md'>
            <div className='bg-green-500 rounded-full p-0.5'>
              <Check className='w-3 h-3 text-white' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
