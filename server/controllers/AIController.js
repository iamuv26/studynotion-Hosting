const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

exports.chatWithGemini = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Gemini API Key is missing in server configuration",
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({
            success: true,
            data: text,
        });
    } catch (error) {
        console.error("Error in chatWithGemini:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
