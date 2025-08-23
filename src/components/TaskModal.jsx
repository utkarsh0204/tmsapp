import { Check, X } from "lucide-react";
import { api } from "./Api";

const PRIORITIES = JSON.parse(import.meta.env.VITE_TASK_PRIORITIES);

export const TaskModal = ({ categoryId, taskTitle, setTaskTitle, taskDescription, setTaskDescription, taskPriority, setTaskPriority, editingTask, setCategories, setErrorMessage, closeModals }) => {

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!taskTitle.trim()) {
            alert("Task title cannot be empty");
            return
        }
        api.createTask(categoryId, taskTitle, taskDescription, taskPriority, setCategories, setErrorMessage, (message) => {
            alert(message || "Failed to create task");
        });
        closeModals();
    }

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (!editingTask) {
            alert("No task to update");
            return;
        }
        if (!taskTitle.trim()) {
            alert("Task title cannot be empty");
            return
        }
        api.updateTask(editingTask.id, taskTitle, taskDescription, taskPriority, setCategories, setErrorMessage, (message) => {
            alert(message || "Failed to update task");
        });
        closeModals();
    }

    return (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {editingTask ? 'Edit Task' : 'Create Task'}
                    </h3>
                    <button
                        onClick={closeModals}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Task Title
                        </label>
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task title"
                            autoFocus
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    editingTask ? handleUpdateTask(e) : handleCreateTask(e);
                                }
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description (optional)
                        </label>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task description"
                            rows={3}
                        />
                    </div>

                    <div className="mb-4">

                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Priority</label>
                        <select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Object.entries(PRIORITIES).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}

                        </select>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModals}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={editingTask ? handleUpdateTask : handleCreateTask}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Check size={16} />
                            {editingTask ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
