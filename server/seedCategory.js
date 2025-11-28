const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

const dbConnect = require("./config/database");

async function seedCategory() {
    try {
        await dbConnect.connect();

        const categories = [
            { name: "Web Development", description: "Courses related to Web Development", notes: "Basic notes and knowledge about Web Development" },
            { name: "Mobile Development", description: "Courses related to Mobile Development", notes: "Basic notes and knowledge about Mobile Development" },
            { name: "Data Science", description: "Courses related to Data Science", notes: "Basic notes and knowledge about Data Science" },
            { name: "Artificial Intelligence", description: "Courses related to Artificial Intelligence", notes: "Basic notes and knowledge about Artificial Intelligence" },
            { name: "DevOps", description: "Courses related to DevOps", notes: "Basic notes and knowledge about DevOps" },
            { name: "Blockchain", description: "Courses related to Blockchain", notes: "Basic notes and knowledge about Blockchain" },
        ];

        for (const category of categories) {
            const existingCategory = await Category.findOne({ name: category.name });
            if (!existingCategory) {
                await Category.create(category);
                console.log(`Category created: ${category.name}`);
            } else {
                // Update existing category with notes if missing
                if (!existingCategory.notes) {
                    existingCategory.notes = category.notes;
                    await existingCategory.save();
                    console.log(`Category updated with notes: ${category.name}`);
                } else {
                    console.log(`Category already exists: ${category.name}`);
                }
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
