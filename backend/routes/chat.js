const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const OpenAI = require("openai");

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

router.post("/", async (req, res) => {

    try {

        const { message, suspect } = req.body;

        const promptPath = path.join(
            __dirname,
            `../prompts/${suspect}.txt`
        );

        const systemPrompt =
            fs.readFileSync(promptPath, "utf8");

        const completion =
            await client.chat.completions.create({

            model: "openai/gpt-3.5-turbo",

            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        console.log(completion);

        const response =
            completion.choices[0].message.content;

        res.json({
            response: response
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            response: "ERROR IA"
        });
    }
});

module.exports = router;