import React from 'react'

export const Headers = ({ openCategoryModal }) => {
    return (
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
    )
}
