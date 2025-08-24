import { Edit2, Grip, Plus, Trash2 } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const CategoryCard = ({
    category,
    openCategoryModal,
    deleteCategory,
    draggedOver,
    openTaskModal,
    handleDeleteTask
}) => {

    const {
        attributes,
        setNodeRef,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: `cat_${category.id}`, data: { type: 'category', category: category } });

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                transition,
                transform: CSS.Transform.toString(transform),
                zIndex: isDragging ? 999 : 'auto',
            }}
            dra
            className={`min-w-80 bg-white rounded-lg shadow-sm border-2 transition-colors ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
                }`}
        >
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => openTaskModal(category.id)}
                            className="text-blue-600 hover:text-blue-800 p-1 transition-colors"
                            title="Add Task"
                        >
                            <Plus size={16} />
                        </button>
                        <button
                            onClick={() => openCategoryModal(category)}
                            className='text-gray-500 hover:text-gray-700 p-1 transition-colors'
                            title="Edit Category"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => deleteCategory(category.id)}
                            className='text-red-500 hover:text-red-700 p-1 transition-colors'
                            title="Delete Category"
                        >
                            <Trash2 size={16} />
                        </button>
                        <button
                            {...listeners}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                            className='text-gray-500 hover:text-gray-700 p-1 transition-colors' title='Drag to Reorder'>
                            <Grip />
                        </button>
                    </div>
                </div>
                <div className='text-sm text-gray-500 mt-1">' >
                    {category.tasks ? category.tasks.length : 0} task{category.tasks && category.tasks.length !== 1 ? 's' : ''}
                </div>
            </div>
            <div className='p-4 space-y-3 min-h-32'>
                {category.tasks && category.tasks.length > 0 ? (
                    <SortableContext items={category.tasks.map((task) => task.id)}>
                        {category.tasks.map((task) => (
                            <TaskCard key={task.id} category={category} task={task} openTaskModal={openTaskModal} handleDeleteTask={handleDeleteTask} />
                        ))}
                    </SortableContext>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">No tasks yet</p>
                        <button
                            onClick={() => openTaskModal(category.id)}
                            className="text-blue-500 hover:text-blue-700 text-sm mt-2 transition-colors"
                        >
                            Add your first task
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}
