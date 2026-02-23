/**
 * Utility functions for dynamic price styling based on Costa Rica color themes
 * 
 * Price ranges:
 * - Low (Guanacaste colors): Warm colors - reds, oranges, yellows
 * - High (Costa Rica forest & ocean): Cool colors - emerald green to turquoise
 */

// Define price thresholds
const PRICE_THRESHOLDS = {
  LOW: 150000,      // Below this = Guanacaste colors
  MID_LOW: 250000,  // Transition zone
  MID_HIGH: 350000, // Transition zone  
  HIGH: 450000      // Above this = Premium green-turquoise
};

/**
 * Gets the appropriate gradient classes for a price
 * Returns an object with gradient and text color classes
 */
export function getPriceGradient(price: number): {
  gradient: string;
  textGradient: string;
  glowColor: string;
  borderColor: string;
  bgColor: string;
} {
  if (price < PRICE_THRESHOLDS.LOW) {
    // Very affordable - Warm Guanacaste sunset colors
    return {
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      textGradient: 'from-red-600 via-orange-600 to-yellow-600',
      glowColor: 'shadow-orange-500/20',
      borderColor: 'border-orange-400/30',
      bgColor: 'bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-yellow-950/30'
    };
  } else if (price < PRICE_THRESHOLDS.MID_LOW) {
    // Affordable - Orange to amber tones
    return {
      gradient: 'from-orange-500 via-amber-500 to-yellow-400',
      textGradient: 'from-orange-600 via-amber-600 to-yellow-500',
      glowColor: 'shadow-amber-500/20',
      borderColor: 'border-amber-400/30',
      bgColor: 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-yellow-950/30'
    };
  } else if (price < PRICE_THRESHOLDS.MID_HIGH) {
    // Mid-range - Transitioning from warm to cool
    return {
      gradient: 'from-amber-500 via-lime-500 to-emerald-500',
      textGradient: 'from-amber-600 via-lime-600 to-emerald-600',
      glowColor: 'shadow-lime-500/20',
      borderColor: 'border-lime-400/30',
      bgColor: 'bg-gradient-to-r from-amber-50 via-lime-50 to-emerald-50 dark:from-amber-950/30 dark:via-lime-950/30 dark:to-emerald-950/30'
    };
  } else if (price < PRICE_THRESHOLDS.HIGH) {
    // Premium - Costa Rica forest greens
    return {
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      textGradient: 'from-emerald-600 via-green-600 to-teal-600',
      glowColor: 'shadow-emerald-500/20',
      borderColor: 'border-emerald-400/30',
      bgColor: 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-teal-950/30'
    };
  } else {
    // Luxury - Costa Rica ocean and forest (emerald to turquoise)
    return {
      gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
      textGradient: 'from-emerald-700 via-teal-600 to-cyan-600',
      glowColor: 'shadow-teal-500/25',
      borderColor: 'border-teal-400/30',
      bgColor: 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30'
    };
  }
}

/**
 * Gets a simple text color for price without gradient
 */
export function getPriceTextColor(price: number): string {
  if (price < PRICE_THRESHOLDS.LOW) {
    return 'text-orange-600 dark:text-orange-400';
  } else if (price < PRICE_THRESHOLDS.MID_LOW) {
    return 'text-amber-600 dark:text-amber-400';
  } else if (price < PRICE_THRESHOLDS.MID_HIGH) {
    return 'text-lime-600 dark:text-lime-400';
  } else if (price < PRICE_THRESHOLDS.HIGH) {
    return 'text-emerald-600 dark:text-emerald-400';
  } else {
    return 'text-teal-600 dark:text-teal-400';
  }
}

/**
 * Gets a price category label in Spanish
 */
export function getPriceCategory(price: number): string {
  if (price < PRICE_THRESHOLDS.LOW) {
    return 'Súper Accesible';
  } else if (price < PRICE_THRESHOLDS.MID_LOW) {
    return 'Accesible';
  } else if (price < PRICE_THRESHOLDS.MID_HIGH) {
    return 'Valor Intermedio';
  } else if (price < PRICE_THRESHOLDS.HIGH) {
    return 'Premium';
  } else {
    return 'Ultra Premium';
  }
}
