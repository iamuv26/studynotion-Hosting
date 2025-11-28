const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

const dbConnect = require("./config/database");

async function seedCategory() {
    try {
        await dbConnect.connect();

        const categories = [
            { name: "Web Development", description: "Courses related to Web Development" },
            { name: "Mobile Development", description: "Courses related to Mobile Development" },
            { name: "Data Science", description: "Courses related to Data Science" },
            { name: "Artificial Intelligence", description: "Courses related to Artificial Intelligence" },
            { name: "DevOps", description: "Courses related to DevOps" },
            { name: "Blockchain", description: "Courses related to Blockchain" },
        ];

        for (const category of categories) {
            const existingCategory = await Category.findOne({ name: category.name });
            if (!existingCategory) {
                await Category.create(category);
                console.log(`Category created: ${category.name}`);
            } else {
                console.log(`Category already exists: ${category.name}`);
            }
        }

        console.log("Category seeding completed");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding category:", error);
        process.exit(1);
    }
}

seedCategory();
