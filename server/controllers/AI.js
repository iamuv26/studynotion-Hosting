exports.chat = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        // Mock AI Response logic
        let responseText = "I'm a simulated AI. I can help you with your studies! Try asking about 'courses', 'python', or simple math like '1+2'.";

        const lowerPrompt = prompt.toLowerCase();

        // Basic Math Capability
        // Match patterns like "1+2", "add 1+3", "5 * 6"
        const mathRegex = /(\d+)\s*([\+\-\*\/])\s*(\d+)/;
        const mathMatch = prompt.match(mathRegex);

        if (mathMatch) {
            const n1 = parseFloat(mathMatch[1]);
            const operator = mathMatch[2];
            const n2 = parseFloat(mathMatch[3]);
            let result;

            switch (operator) {
                case '+': result = n1 + n2; break;
                case '-': result = n1 - n2; break;
                case '*': result = n1 * n2; break;
                case '/': result = n1 / n2; break;
            }
            responseText = `The answer is ${result}.`;
        } else if (lowerPrompt.includes("hello") || lowerPrompt.includes("hi")) {
            responseText = "Hello! How can I assist you with your learning journey today?";
        } else if (lowerPrompt.includes("course")) {
            responseText = "We have a wide range of courses available. You can browse them in the Catalog section.";
        } else if (lowerPrompt.includes("python")) {
            responseText = "Python is a great language to learn! We have several top-rated Python courses.";
        } else if (lowerPrompt.includes("javascript") || lowerPrompt.includes("js")) {
            responseText = "JavaScript is the language of the web. Check out our Full Stack Web Development course.";
        } else if (lowerPrompt.includes("c++") || lowerPrompt.includes("cpp")) {
            responseText = "C++ is a powerful language for system programming. Check out our Data Structures and Algorithms in C++ course.";
        }

        return res.status(200).json({
            success: true,
            data: responseText,
            message: "AI response generated successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate AI response",
            error: error.message,
        });
    }
};
