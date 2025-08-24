
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINTS = {
    "CREATE_CATEGORY": `${API_BASE_URL}/categories`,
    "GET_CATEGORIES": `${API_BASE_URL}/categories`,
    "GET_CATEGORY": (id) => `${API_BASE_URL}/categories/${id}`,
    "UPDATE_CATEGORY": (id) => `${API_BASE_URL}/categories/${id}`,
    "DELETE_CATEGORY": (id) => `${API_BASE_URL}/categories/${id}`,
    "CREATE_TASK": `${API_BASE_URL}/tasks`,
    "UPDATE_TASK": (id) => `${API_BASE_URL}/tasks/${id}`,
    "DELETE_TASK": (id) => `${API_BASE_URL}/tasks/${id}`,
};
const HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const getCategories = async (setCategories, setErrorMessage) => {
    try {
        const response = await fetch(API_ENDPOINTS.GET_CATEGORIES, {
            method: "GET",
            headers: HEADERS,
        });
        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to fetch categories: ${data.message}`, data.error);
            setErrorMessage(data.message || "Failed to fetch categories");
            return;
        }
        setCategories(data.data.categories || []);
        setErrorMessage("");
    } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMessage("Failed to fetch categories. Please try again later.");
    }
}

const createCategory = async (categoryName, setCategories, setErrorMessage, displayMessage) => {
    try {
        const response = await fetch(API_ENDPOINTS.CREATE_CATEGORY, {
            method: "POST",
            headers: HEADERS,// Clear any previous error message
            body: JSON.stringify({ name: categoryName }),
        });
        if (response.status === 400 || response.status === 422) {
            const body = await response.json();
            let errorMessage = body.message || "Invalid category data";
            if (body.error) {
                const errorArr = body.error;
                for (const key in errorArr) {
                    errorMessage += `\n${key}: ${errorArr[key].join(", ")}`;
                }

            }
            console.error("Bad Request:", body);
            displayMessage(errorMessage);
            return;
        }
        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to create category: ${data.message}`, data.error);
            displayMessage(data.message || "Failed to create category");
            return;
        }
        setErrorMessage("");
        getCategories(setCategories, setErrorMessage);
        displayMessage(data.message || "Category created successfully");
    } catch (error) {
        console.error("Error creating category:", error);
        displayMessage("Failed to create category. Please try again later.");
    }
}

const updateCategory = async (id, categoryName, setCategories, setErrorMessage, displayMessage) => {
    try {
        const response = await fetch(API_ENDPOINTS.UPDATE_CATEGORY(id), {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify({ name: categoryName }),
        });
        if (response.status === 400 || response.status === 422) {
            const body = await response.json();
            let errorMessage = body.message || "Invalid category data";
            if (body.error) {
                const errorArr = body.error;
                for (const key in errorArr) {
                    errorMessage += `\n${key}: ${errorArr[key].join(", ")}`;
                }
            }
            console.error("Bad Request:", body);
            displayMessage(errorMessage);
            return;
        }
        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to update category: ${data.message}`, data.error);
            displayMessage(data.message || "Failed to update category");
            return;
        }
        setErrorMessage("");
        getCategories(setCategories, setErrorMessage);
        displayMessage(data.message || "Category updated successfully");
    } catch (error) {
        console.error("Error updating category:", error);
        displayMessage("Failed to update category. Please try again later.");
    }
}

const deleteCategory = async (id, setCategories, setErrorMessage, displayMessage) => {
    try {
        const response = await fetch(API_ENDPOINTS.DELETE_CATEGORY(id), {
            method: "DELETE",
            headers: HEADERS,
        });
        if (response.status === 400 || response.status === 422) {
            const body = await response.json();
            let errorMessage = body.message || "Invalid category data";
            if (body.error) {
                const errorArr = body.error;
                for (const key in errorArr) {
                    errorMessage += `\n${key}: ${errorArr[key].join(", ")}`;
                }
            }
            console.error("Bad Request:", body);
            displayMessage(errorMessage);
            return;
        }

        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to delete category: ${data.message}`, data.error);
            displayMessage(data.message || "Failed to delete category");
            return;
        }
        setErrorMessage("");
        getCategories(setCategories, setErrorMessage);
        displayMessage(data.message || "Category deleted successfully");
    } catch (error) {
        console.error("Error deleting category:", error);
        displayMessage("Failed to delete category. Please try again later.");
    }
}

const createTask = async (categoryId, title, description, priority, setCategories, setErrorMessage, displayMessage) => {
    try {
        const response = await fetch(API_ENDPOINTS.CREATE_TASK, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ category_id: categoryId, title, description, priority }),
        });
        if (response.status === 400 || response.status === 422) {
            const body = await response.json();
            let errorMessage = body.message || "Invalid task data";
            if (body.error) {
                const errorArr = body.error;
                for (const key in errorArr) {
                    errorMessage += `\n${key}: ${errorArr[key].join(", ")}`;
                }
            }
            console.error("Bad Request:", body);
            displayMessage(errorMessage);
            return;
        }
        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to create task: ${data.message}`, data.error);
            displayMessage(data.message || "Failed to create task");
            return;
        }
        setErrorMessage("");
        getCategories(setCategories, setErrorMessage);
        displayMessage(data.message || "Task created successfully");
    } catch (error) {
        console.error("Error creating task:", error);
        displayMessage("Failed to create task. Please try again later.");
    }
}

const updateTask = async (id, title, description, priority, setCategories, setErrorMessage, displayMessage = null, categoryId = null, position = null) => {
    try {
        let request = { title, description, priority };
        if (position !== null) {
            request.position = position;
        }
        const response = await fetch(API_ENDPOINTS.UPDATE_TASK(id), {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(request),
        });
        if (response.status === 400 || response.status === 422) {
            const body = await response.json();
            let errorMessage = body.message || "Invalid task data";
            if (body.error) {
                const errorArr = body.error;
                for (const key in errorArr) {
                    errorMessage += `\n${key}: ${errorArr[key].join(", ")}`;
                }
            }
            console.error("Bad Request:", body);
            if (displayMessage) {
                displayMessage(errorMessage);
            }
            return;
        }
        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to update task: ${data.message}`, data.error);
            if (displayMessage) displayMessage(data.message || "Failed to update task");
            return;
        }
        setErrorMessage("");
        getCategories(setCategories, setErrorMessage);
        if (displayMessage) displayMessage(data.message || "Task updated successfully");
    } catch (error) {
        console.error("Error updating task:", error);
        if (displayMessage) displayMessage("Failed to update task. Please try again later.");
    }
}

const deleteTask = async (id, setCategories, setErrorMessage, displayMessage) => {
    try {
        const response = await fetch(API_ENDPOINTS.DELETE_TASK(id), {
            method: "DELETE",
            headers: HEADERS,
        });
        if (response.status === 400 || response.status === 422) {
            const body = await response.json();
            let errorMessage = body.message || "Invalid task data";
            if (body.error) {
                const errorArr = body.error;
                for (const key in errorArr) {
                    errorMessage += `\n${key}: ${errorArr[key].join(", ")}`;
                }
            }
            console.error("Bad Request:", body);
            displayMessage(errorMessage);
            return;
        }

        if (!response.ok) {
            const body = await response.json();
            throw new Error(`HTTP error! status:${response.status} message: ${body.message || "Unknown error"}`);
        }
        const data = await response.json();
        if (!data || data.status !== "success") {
            console.error(`Failed to delete task: ${data.message}`, data.error);
            displayMessage(data.message || "Failed to delete task");
            return;
        }
        setErrorMessage("");
        getCategories(setCategories, setErrorMessage);
        displayMessage(data.message || "Task deleted successfully");
    } catch (error) {
        console.error("Error deleting task:", error);
        displayMessage("Failed to delete task. Please try again later.");
    }
}








export const api = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    createTask,
    updateTask,
    deleteTask
}