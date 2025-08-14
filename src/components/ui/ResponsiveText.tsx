
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'caption' | 'lead' | 'small';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  autoWrap?: boolean;
  breakLongWords?: boolean;
}

const ResponsiveText = React.memo<ResponsiveTextProps>(({
  children,
  variant = 'p',
  className,
  as,
  autoWrap = true,
  breakLongWords = true
}) => {
  const baseWrapClasses = autoWrap ? 'auto-wrap' : '';
  const longWordClasses = breakLongWords ? 'break-words' : 'break-normal';

  const variantClasses = {
    h1: cn(
      'text-2xl xs:text-3xl sm-mobile:text-4xl lg-mobile:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl',
      'font-bold leading-tight tracking-tight',
      'bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent',
      autoWrap && 'auto-wrap-title'
    ),
    h2: cn(
      'text-xl xs:text-2xl sm-mobile:text-3xl lg-mobile:text-4xl sm:text-5xl lg:text-6xl',
      'font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100',
      autoWrap && 'auto-wrap-title'
    ),
    h3: cn(
      'text-lg xs:text-xl sm-mobile:text-2xl lg-mobile:text-3xl sm:text-4xl',
      'font-semibold leading-tight text-gray-900 dark:text-gray-100',
      autoWrap && 'auto-wrap-title'
    ),
    h4: cn(
      'text-base xs:text-lg sm-mobile:text-xl lg-mobile:text-2xl',
      'font-semibold text-gray-900 dark:text-gray-100',
      autoWrap && 'auto-wrap-title'
    ),
    p: cn(
      'text-sm xs:text-base sm-mobile:text-lg',
      'text-gray-600 dark:text-gray-300 leading-relaxed',
      autoWrap && 'auto-wrap-text'
    ),
    lead: cn(
      'text-base xs:text-lg sm-mobile:text-xl lg-mobile:text-2xl',
      'text-gray-700 dark:text-gray-200 leading-relaxed font-medium',
      autoWrap && 'auto-wrap-text'
    ),
    caption: cn(
      'text-xs xs:text-sm',
      'text-gray-500 dark:text-gray-400 leading-relaxed',
      autoWrap && 'auto-wrap-text'
    ),
    small: cn(
      'text-xs leading-relaxed text-gray-500 dark:text-gray-400',
      autoWrap && 'auto-wrap-text'
    )
  };

  const Component = as || (variant.startsWith('h') ? variant : 'p') as keyof JSX.IntrinsicElements;

  return (
    <Component 
      className={cn(
        variantClasses[variant],
        baseWrapClasses,
        longWordClasses,
        className
      )}
    >
      {children}
    </Component>
  );
});

ResponsiveText.displayName = 'ResponsiveText';

export default ResponsiveText;
