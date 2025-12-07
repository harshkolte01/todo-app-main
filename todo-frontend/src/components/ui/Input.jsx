/**
 * Input Component
 * 
 * A reusable input field component with label and error message support.
 * 
 * Props:
 * - label: string - Label text to display above input
 * - type: string - Input type (text, email, password, date, etc.) (default: 'text')
 * - placeholder: string - Placeholder text
 * - value: string - Current input value
 * - onChange: function - Called when input value changes
 * - error: string - Error message to display (optional)
 * - disabled: boolean - Disable the input (default: false)
 * - required: boolean - Mark field as required (default: false)
 * - name: string - Input name attribute
 * 
 * Usage Example:
 * <Input 
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={emailError}
 *   required
 * />
 */

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  disabled = false,
  required = false,
  name
}) => {
  
  // Base input styles
  const baseInputStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200';
  
  // Different styles based on error state
  const inputStyles = error 
    ? `${baseInputStyles} border-red-500 focus:ring-red-500 focus:border-red-500`
    : `${baseInputStyles} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
  
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Field */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputStyles}
      />
      
      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;