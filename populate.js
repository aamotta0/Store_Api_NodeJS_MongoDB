require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany(); // This line deletes all existing documents in the product collection in the database.
        // This line creates new product documents in the database using the data provided in the JSON file products.json.
        await Product.create(jsonProducts); 
        console.log("Success!!! 🚀");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
