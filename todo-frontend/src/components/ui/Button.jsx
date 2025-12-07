/**
 * Button Component
 * 
 * A reusable button component with different variants and sizes.
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'danger' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - onClick: function to call when button is clicked
 * - disabled: boolean to disable the button
 * - type: 'button' | 'submit' | 'reset' (default: 'button')
 * - children: button text or content
 * 
 * Usage Example:
 * <Button variant="primary" onClick={handleClick}>Click Me</Button>
 * <Button variant="danger" size="sm">Delete</Button>
 */

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  type = 'button',
  children 
}) => {
  
  // Base styles that all buttons share
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Different color variants
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  // Different sizes
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Combine all styles together
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;