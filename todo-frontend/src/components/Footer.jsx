/**
 * Footer Component
 * 
 * Simple footer with copyright and links.
 * Displayed at the bottom of all pages.
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-3">TodoApp</h3>
            <p className="text-gray-400 text-sm">
              A simple and powerful todo application to help you organize your tasks and boost productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/todos" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Todos
                </a>
              </li>
              <li>
                <a href="/auth" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold mb-3">Features</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Create & Manage Todos</li>
              <li>✓ Set Priorities & Due Dates</li>
              <li>✓ Search & Filter</li>
              <li>✓ User Authentication</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} TodoApp. All rights reserved.
            </p>

            {/* Social Links or Additional Info */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;