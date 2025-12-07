// validation middleware for creating todo
exports.validateCreateTodo = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required." })
    }

    next();
};


// validation in update todo
exports.validateUpdateTodo = (req, res, next) => {
    const { title, priority, status, dueDate } = req.body;

    if (title !== undefined) {
        if (title.trim() === "") {
            return res.status(400).json({ message: "Title cannot be empty" });
        }
    }

    if (priority !== undefined) {
        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({
                message: "Priority must be: low, medium, high"
            })
        }
    }

    if (status !== undefined) {
        const validStatuses = ["pending", "completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Status must be pending or completed"
            })
        }
    }
    if (dueDate !== undefined && dueDate !== null && dueDate !== "") {
        const date = new Date(dueDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: "invalid date format" })
        }
    }
    next();
}

// validation in mongoose object id
exports.validateTodoId = (req, res, next) => {
    const { id } = req.params;
    const mongoose = require("mongoose");

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: " invalid todo id" })
    }
    next();
}