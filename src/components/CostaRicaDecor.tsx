import { Leaf, Waves } from 'lucide-react';

interface CostaRicaDecorProps {
  variant?: 'forest' | 'beach' | 'both';
  position?: 'top' | 'bottom';
  className?: string;
}

export function CostaRicaDecor({ 
  variant = 'both', 
  position = 'top',
  className = '' 
}: CostaRicaDecorProps) {
  const showForest = variant === 'forest' || variant === 'both';
  const showBeach = variant === 'beach' || variant === 'both';

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {/* Forest decoration - Green leaves */}
      {showForest && (
        <div className={`absolute ${position === 'top' ? 'top-0 left-0' : 'bottom-0 left-0'} opacity-20`}>
          <div className="relative">
            <Leaf className="h-32 w-32 text-primary animate-pulse" style={{ animationDuration: '3s' }} />
            <Leaf className="absolute top-8 left-8 h-20 w-20 text-primary/70 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
            <Leaf className="absolute top-16 left-4 h-16 w-16 text-primary/50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          </div>
        </div>
      )}

      {/* Beach decoration - Blue waves */}
      {showBeach && (
        <div className={`absolute ${position === 'top' ? 'top-0 right-0' : 'bottom-0 right-0'} opacity-20`}>
          <div className="relative">
            <Waves className="h-32 w-32 text-secondary animate-pulse" style={{ animationDuration: '4s' }} />
            <Waves className="absolute top-8 right-8 h-20 w-20 text-secondary/70 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.7s' }} />
            <Waves className="absolute top-16 right-4 h-16 w-16 text-secondary/50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
          </div>
        </div>
      )}
    </div>
  );
}
