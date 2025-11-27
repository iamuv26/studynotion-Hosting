const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

const dbConnect = require("./config/database");

async function seedCategory() {
    try {
        await dbConnect.connect();

        const existingCategory = await Category.findOne({ name: "Web Development" });
        if (existingCategory) {
            console.log("Category already exists");
            process.exit(0);
        }

        await Category.create({
            name: "Web Development",
            description: "Courses related to Web Development",
        });

        console.log("Category created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding category:", error);
        process.exit(1);
    }
}

seedCategory();
