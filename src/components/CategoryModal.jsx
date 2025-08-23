import { Check, X } from 'lucide-react'
import { api } from './Api';

export const CategoryModal = ({ editingCategory, categoryName, setCategoryName, setCategories, closeModals, setErrorMessage }) => {

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert("Category name cannot be empty");
            return;
        }
        api.createCategory(categoryName, setCategories, setErrorMessage, (message) => {
            alert(message || "Failed to create category");
        });
        closeModals();
    }
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert("Category name cannot be empty");
            return;
        }
        api.updateCategory(editingCategory.id, categoryName, setCategories, setErrorMessage, (message) => {
            alert(message || "Failed to update category");
        });
        closeModals();
    }

    return (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {editingCategory ? 'Edit Category' : 'Create Category'}
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
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter category name"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    editingCategory ? handleUpdateCategory(e) : handleCreateCategory(e);
                                }
                            }}
                        />
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
                            onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Check size={16} />
                            {editingCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
