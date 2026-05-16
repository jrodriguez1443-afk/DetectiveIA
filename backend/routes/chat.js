const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
router.post("/", async (req, res) => {
    try {
        const { message, suspect } = req.body;
        const promptPath = path.join(__dirname, `../prompts/${suspect}.txt`);
        const systemPrompt = fs.readFileSync(promptPath, "utf8");

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const finalPrompt = `
        ${systemPrompt}

        Detective pregunta:
        ${message}
        `;

        const result = await model.generateContent(finalPrompt);

        const response = result.response.text();

        res.json({ response });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Error IA"
        });
    }
});

module.exports = router;