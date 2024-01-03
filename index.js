require("dotenv").config();
require("express-async-errors");


//express
const express = require("express");
const app = express();

// Database MongoDB
const connectDB = require("./db/connect");

// Routes
const productsRouter = require("./routes/products");

// Erros
const notFoundMiddleware = require("./middleware/not-found");
const erroMiddleware = require("./middleware/error-handler");
const e = require("express");

// Middleware
app.use(express.json());


// routes
app.get("/", (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">product route</a>');
});

app.use("/api/v1/products", productsRouter);



// products route
app.use(notFoundMiddleware);
app.use(erroMiddleware);



// Server
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening port ${port}... 🚀`));
    } catch (error) {
        console.log(error);
    }
}

start();