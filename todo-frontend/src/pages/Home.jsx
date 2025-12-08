import { Button } from '../components/ui';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from '../components/Link';
import { useAuth } from '../context/AuthContext';

/**
 * Home/Landing Page
 * 
 * Main landing page showing app features and benefits.
 * Encourages users to sign up or sign in.
 */

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Simple Todo Management
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            A clean and straightforward todo application built with React and Node.js. Manage your tasks efficiently with user authentication and full CRUD operations.
          </p>
          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/todos">
                <Button variant="primary" size="lg">
                  Go to Todos
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="lg">
                  Get Started Free
                </Button>
              </Link>
            )}
            <a href="#features">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-gray-600">
              Simple yet powerful features for task management
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 - User Authentication */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                User Authentication
              </h3>
              <p className="text-gray-600">
                Secure sign up and sign in with JWT authentication. Your todos are private and accessible only to you.
              </p>
            </div>

            {/* Feature 2 - Create Todos */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Create Todos
              </h3>
              <p className="text-gray-600">
                Add new tasks with title, description, priority levels, and due dates to stay organized.
              </p>
            </div>

            {/* Feature 3 - Update Todos */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Update Todos
              </h3>
              <p className="text-gray-600">
                Edit your tasks anytime. Update details, change priorities, or mark tasks as complete.
              </p>
            </div>

            {/* Feature 4 - Delete Todos */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Todos
              </h3>
              <p className="text-gray-600">
                Remove completed or unwanted tasks to keep your todo list clean and focused.
              </p>
            </div>

            {/* Feature 5 - Search & Filter */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search & Filter
              </h3>
              <p className="text-gray-600">
                Quickly find tasks with search functionality and filter by status or priority level.
              </p>
            </div>

            {/* Feature 6 - Sort */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sort & Organize
              </h3>
              <p className="text-gray-600">
                Sort your todos by date, priority, or title to view them in the order that works best for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About This Project
            </h2>
            <p className="text-gray-600">
              A full-stack todo application demonstrating modern web development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Frontend */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Frontend
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React with Hooks</li>
                <li>• Context API for state management</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Client-side routing</li>
                <li>• Responsive design</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Backend
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js & Express</li>
                <li>• MongoDB database</li>
                <li>• JWT authentication</li>
                <li>• RESTful API design</li>
                <li>• Secure password hashing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Managing Your Tasks
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Sign up now and experience simple, efficient todo management.
          </p>
          {isAuthenticated ? (
            <Link to="/todos">
              <Button variant="secondary" size="lg">
                Go to Your Todos
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="secondary" size="lg">
                Start Using TodoApp Now
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;