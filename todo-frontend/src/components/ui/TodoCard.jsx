import Button from './Button';

/**
 * TodoCard Component
 * 
 * Displays a single todo item with all its details.
 * 
 * Props:
 * - todo: object - The todo item with properties:
 *   - _id: string - Todo ID
 *   - title: string - Todo title
 *   - description: string - Todo description
 *   - priority: 'low' | 'medium' | 'high' - Priority level
 *   - status: 'pending' | 'completed' - Current status
 *   - dueDate: string - Due date (optional)
 * - onEdit: function - Called when edit button is clicked
 * - onDelete: function - Called when delete button is clicked
 * - onToggleStatus: function - Called when status toggle is clicked
 * 
 * Usage Example:
 * <TodoCard 
 *   todo={todoItem}
 *   onEdit={() => handleEdit(todoItem._id)}
 *   onDelete={() => handleDelete(todoItem._id)}
 *   onToggleStatus={() => handleToggle(todoItem._id)}
 * />
 */

const TodoCard = ({ todo, onEdit, onDelete, onToggleStatus }) => {
  
  // Priority badge colors
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300'
  };
  
  // Status badge colors
  const statusColors = {
    pending: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };
  
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Header: Title and Badges */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {todo.title}
          </h3>
        </div>
        
        {/* Priority and Status Badges */}
        <div className="flex gap-2 ml-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[todo.status]}`}>
            {todo.status}
          </span>
        </div>
      </div>
      
      {/* Description */}
      {todo.description && (
        <p className="text-gray-600 text-sm mb-3">
          {todo.description}
        </p>
      )}
      
      {/* Due Date */}
      {todo.dueDate && (
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due: {formatDate(todo.dueDate)}
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <Button 
          variant="primary" 
          size="sm" 
          onClick={onToggleStatus}
        >
          {todo.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </Button>
        
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onEdit}
        >
          Edit
        </Button>
        
        <Button 
          variant="danger" 
          size="sm" 
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;