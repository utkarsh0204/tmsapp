import React, { useEffect, useState } from 'react'
import { api } from "./components/Api";
import { CategoryCard } from './components/CategoryCard';
import { CategoryModal } from './components/CategoryModal';
import { Plus } from 'lucide-react';
import { TaskModal } from './components/TaskModal';

export const App = () => {

  const DEFAULT_TASK_PRIORITY = import.meta.env.VITE_DEFAULT_TASK_PRIORITY;

  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [draggedOver, setDraggedOver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [categoryName, setCategoryName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState(DEFAULT_TASK_PRIORITY);

  useEffect(() => {
    api.getCategories(setCategories, setErrorMessage);
  }, []);

  const openCategoryModal = (category = null) => {
    setEditingCategory(category);
    setCategoryName(category ? category.name : '');
    setShowCategoryModal(true);
  };

  const openTaskModal = (categoryId, task = null) => {
    setSelectedCategoryId(categoryId);
    setEditingTask(task);
    setTaskTitle(task ? task.title : '');
    setTaskDescription(task ? task.description : '');
    setTaskPriority(task ? task.priority : DEFAULT_TASK_PRIORITY);
    setShowTaskModal(true);
  };


  const closeModals = () => {
    setShowCategoryModal(false);
    setShowTaskModal(false);
    setEditingCategory(null);
    setEditingTask(null);
    setSelectedCategoryId(null);
    setCategoryName('');
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority(DEFAULT_TASK_PRIORITY);
  }

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        await api.deleteCategory(id, setCategories, setErrorMessage, (message) => {
          alert(message || "Failed to delete category");
        });
      } catch (error) {
        alert("Failed to delete category");
        console.error("Error deleting category:", error);
      }
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      try {
        await api.deleteTask(taskId, setCategories, setErrorMessage, (message) => {
          alert(message || "Failed to delete task");
        });
      } catch (error) {
        alert("Failed to delete task");
        console.error("Error deleting task:", error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
            {/* <p className="text-gray-600 mt-1">Welcome, {user.name}!</p> */}
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
            <button
              onClick={() => openCategoryModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Category
            </button>
            {/* <button
                    onClick={handleLogout}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <LogOut size={20} />
                    Logout
                </button> */}
          </div>
        </div>
        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              openCategoryModal={openCategoryModal}
              deleteCategory={handleDeleteCategory}
              draggedOver={draggedOver}
              openTaskModal={openTaskModal}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
        {showCategoryModal && (
          <CategoryModal
            key={"category-modal"}
            editingCategory={editingCategory} categoryName={categoryName}
            setCategoryName={setCategoryName} setCategories={setCategories}
            closeModals={closeModals}
            setErrorMessage={setErrorMessage}
          />
        )}
        {showTaskModal && (
          <TaskModal
            key={"task-modal"}
            categoryId={selectedCategoryId}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            taskPriority={taskPriority}
            setTaskPriority={setTaskPriority}
            editingTask={editingTask}
            setCategories={setCategories}
            setErrorMessage={setErrorMessage}
            closeModals={closeModals}
          />
        )}
      </div>
    </div>
  )
}


export default App
