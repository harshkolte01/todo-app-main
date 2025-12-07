const Todo = require("../models/Todo");

// Create a new todo
exports.postCreateTodo = async (req, res, next) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;

        const todo = new Todo({
            title,
            description,
            priority,
            status,
            dueDate,
            user: req.user._id
        });

        await todo.save();
        res.status(201).json({
            message: "Todo Created.", todo
        });
    } catch (error) {
        next(error)
    }
}

// Get single todo
exports.getTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: "Todo Not found" });
        }
        res.json({ todo });
    } catch (error) {
        next(error);
    }
}

// Get all todos with search, filter, sort and pagination
exports.getAllTodos = async (req, res, next) => {
    try {
        const {
            search,
            status,
            priority,
            sortBy = "createdAt",
            order = "desc",
            page = 1,
            limit = 5
        } = req.query;

        const query = { user: req.user._id };

        if (search) {
            query.$or = [
                {
                    title: { $regex: search, $options: "i" }
                },
                {
                    description: { $regex: search, $options: "i" }
                }
            ];
        }

        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const sortOptions = {};
        sortOptions[sortBy] = order === "asc" ? 1 : -1;

        const todos = await Todo.find(query).sort(sortOptions).skip(skip).limit(parseInt(limit));

        const totalTodos = await Todo.countDocuments(query);
        const totalPages = Math.ceil(totalTodos / parseInt(limit));

        res.json({
            todos,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalTodos,
                limit: parseInt(limit),
                hasNextPage: parseInt(page) < totalPages,
                hasPrevPage: parseInt(page) > 1
            }
        });
    } catch (error) {
        next(error);
    }
}

// update the todo
exports.putUpdateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status, dueDate } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (priority !== undefined) updateData.priority = priority;
        if (status !== undefined) updateData.status = status;
        if (dueDate !== undefined) updateData.dueDate = dueDate;

        const todo = await Todo.findOneAndUpdate({
            _id: id, user: req.user._id
        }, updateData, { new: true, runValidators: true });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({
            message: "Todo Updated", todo
        });
    } catch (error) {
        next(error);
    }
}

// Delete a todo
exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({
            _id: id,
            user: req.user._id
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" })
    } catch (error) {
        next(error);
    }
}