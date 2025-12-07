const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database connection
const connectDB = require("./config/dBConnection");
connectDB();

// Routes
const routes = require("./routes/index");
app.use("/api", routes)

// test apis
app.get("/", (req, res) => {
    res.send("Api is working");
});

app.use((error, req, res, next) => {
    res.status(500).json({error: error.message })
});

PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  
});