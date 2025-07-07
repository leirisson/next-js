// components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'darkBlue' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = "btn";
  let variantClasses = "";

  switch (variant) {
    case 'primary':
      variantClasses = "btn-primary text-white";
      break;
    case 'secondary':
      variantClasses = "btn-secondary text-white";
      break;
    case 'darkBlue': // Usa a cor 'darkBlue' definida no extend.colors do Tailwind
      variantClasses = "bg-darkBlue text-white hover:bg-darkBlue/90 border-darkBlue";
      break;
    case 'outline':
      variantClasses = "btn-outline btn-primary";
      break;
    default:
      variantClasses = "btn-primary text-white";
  }

  return (
    <Button
      className={`${baseClasses} ${variantClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Button;