import { navigate } from '../utils/navigation';

/**
 * Link Component
 * 
 * A custom link component that provides client-side navigation
 * without full page reloads.
 * 
 * Usage:
 * <Link to="/todos">Go to Todos</Link>
 * <Link to="/profile" className="custom-class">Profile</Link>
 */

const Link = ({ to, children, className = '', ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;