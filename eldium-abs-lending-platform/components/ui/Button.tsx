import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const { primaryColor } = useTheme();

  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-800 focus:ring-opacity-75 transition-colors duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs", // Slightly smaller padding for sm
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  // Using a function to get styles with dynamic primaryColor
  const getVariantStyles = (color: string) => ({
    primary: `text-white hover:opacity-90 focus:ring-[${color}]`, // Tailwind JIT needs explicit color string here
    secondary: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: `border border-[${color}] text-[${color}] hover:text-white focus:ring-[${color}] dark:text-[${color}] dark:border-[${color}] dark:hover:text-gray-900`,
    ghost: `text-[${color}] hover:bg-opacity-10 focus:ring-[${color}] dark:text-[${color}] dark:hover:bg-gray-700`,
  });
  
  const currentVariantBaseStyle = getVariantStyles(primaryColor)[variant];

  // Dynamic styles that need to be applied via the `style` prop
  const dynamicStyle: React.CSSProperties = {};
  if (variant === 'primary') {
    dynamicStyle.backgroundColor = primaryColor;
    // @ts-ignore custom property
    dynamicStyle['--tw-ring-color'] = primaryColor;
  } else if (variant === 'outline' || variant === 'ghost') {
    dynamicStyle.color = primaryColor;
     // @ts-ignore custom property
    dynamicStyle['--tw-ring-color'] = primaryColor;
    if (variant === 'outline') {
      dynamicStyle.borderColor = primaryColor;
    }
  }

  // Special hover for outline - this needs to be handled carefully with Tailwind JIT not picking up dynamic classes from style prop.
  // For simplicity, the hover:bg-primary and hover:text-white for outline is defined directly in the class string if primaryColor is fixed or via JS.
  // The current `getVariantStyles` uses Tailwind's JIT-compatible syntax for text and border colors.
  // For hover on outline, we'll rely on specific classes or JS if it's highly dynamic.
  // A simpler approach for outline hover with dynamic color:
  const hoverProps = (variant === 'outline') ? {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = primaryColor;
      e.currentTarget.style.color = document.documentElement.classList.contains('dark') ? 'rgb(17,24,39)' : 'white'; // Check dark mode for text
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = primaryColor;
    }
  } : {};


  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${currentVariantBaseStyle} ${className || ''}`}
      style={dynamicStyle}
      {...hoverProps}
      {...props}
    >
      {leftIcon && <span className={children ? "mr-2" : ""}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={children ? "ml-2" : ""}>{rightIcon}</span>}
    </button>
  );
};

export default Button;