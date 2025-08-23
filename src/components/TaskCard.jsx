import { Edit2, Trash2 } from 'lucide-react';

const PRIORITIES = JSON.parse(import.meta.env.VITE_TASK_PRIORITIES);

export const TaskCard = ({ category, task, openTaskModal, handleDeleteTask }) => {
    const draggedTask = null;
    return (
        <div
            className={
                `p-3 bg-gray-50 rounded-lg border cursor-move hover:shadow-md transition-all 
                ${draggedTask && draggedTask.id === task.id ? 'opacity-50 transform rotate-2' : 'hover:bg-gray-100'
                }`}
        >
            <div className='flex justify-between items-start mb-2'>
                <h3 className='font-medium text-gray-900 text-sm'>{task.title}</h3>
                <div className="flex gap-1">
                    <button
                        onClick={() => openTaskModal(category.id, task)}
                        className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                        title="Edit task"
                    >
                        <Edit2 size={12} />
                    </button>
                    <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors"
                        title="Delete task"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>
            {task.description && (
                <p className="text-xs text-gray-600">{task.description}</p>
            )}
            {task.priority && (
                <div className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-medium
                    ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}`}>
                    {PRIORITIES[task.priority] || task.priority}</div>
            )}
        </div>
    )
}
